const test = require('node:test');
const assert = require('node:assert/strict');

const { roleIdFromTitle, addRoleId } = require('../scripts/backfill-role-ids.js');

// #180 gives every role a stable identifier so reporting lines, career paths,
// and interaction tables can reference something that survives a rename. The ID
// is seeded from the title once and then frozen: it is not derived at read time,
// because the whole point is that it outlives the title it came from.

test('an id is lowercase kebab-case', () => {
    assert.equal(roleIdFromTitle('Kubernetes Engineer'), 'kubernetes-engineer');
    assert.equal(roleIdFromTitle('AWS Cloud Architect'), 'aws-cloud-architect');
});

// Titles in the catalogue carry qualifiers in brackets, and dropping them would
// collide "Modern Workplace Senior Engineer (Microsoft 365)" with a plain
// "Modern Workplace Senior Engineer".
test('a parenthesised qualifier is kept, not dropped', () => {
    assert.equal(
        roleIdFromTitle('Modern Workplace Senior Engineer (Microsoft 365)'),
        'modern-workplace-senior-engineer-microsoft-365',
    );
});

test('an ampersand becomes a word rather than vanishing', () => {
    assert.equal(roleIdFromTitle('Risk & Compliance Lead'), 'risk-and-compliance-lead');
});

test('punctuation and repeated separators collapse', () => {
    assert.equal(roleIdFromTitle('  Data   Protection // Backup  Engineer  '), 'data-protection-backup-engineer');
});

const META = [
    '# Kubernetes Engineer',
    '',
    '| Field | Value |',
    '|---|---|',
    '| **Domain** | Kubernetes |',
    '| **Role Level** | Engineer |',
    '| **Reports To** | Kubernetes Senior Engineer |',
    '| **Direct Reports** | None |',
    '| **Content Owner** | catalogue-maintainers |',
    '| **Review Status** | mechanical |',
    '| **Last Reviewed** | 2026-03 |',
    '',
    '## Role Overview',
    '',
    'Text.',
    '',
].join('\n');

test('the id is inserted as the first metadata row', () => {
    const lines = addRoleId(META).split('\n');
    const id = lines.findIndex(l => l.includes('**Role ID**'));
    const domain = lines.findIndex(l => l.includes('**Domain**'));
    assert.ok(id !== -1, 'Role ID should be present');
    assert.ok(id < domain, 'the identifier belongs above the descriptive fields');
    assert.match(lines[id], /\|\s*\*\*Role ID\*\*\s*\|\s*`kubernetes-engineer`\s*\|/);
});

// Re-running the backfill must never reassign an id: a changed title after the
// first pass is exactly the rename the id exists to survive.
test('an existing id is never rewritten, even if the title changed', () => {
    const withId = addRoleId(META);
    const renamed = withId.replace('# Kubernetes Engineer', '# Kubernetes Platform Engineer');
    assert.match(addRoleId(renamed), /`kubernetes-engineer`/);
    assert.doesNotMatch(addRoleId(renamed), /`kubernetes-platform-engineer`/);
});

test('nothing outside the metadata table changes', () => {
    const out = addRoleId(META);
    assert.match(out, /## Role Overview\n\nText\./);
    assert.equal(out.split('\n').length, META.split('\n').length + 1);
});

test('a document with no title or table is returned unchanged', () => {
    const plain = 'No heading, no table.\n';
    assert.equal(addRoleId(plain), plain);
});
