const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
    certificationSection,
    inventoryRole,
    aliasKey,
    classifyEntry,
} = require('../scripts/credential-inventory.js');

// The catalogue's certification sections are not uniform, and the differences
// distort a naive bullet count in both directions (#210):
//
//   * 97 roles carry a flat list *and* "**Complementary Certifications:**"
//     subheads naming the same credentials again — double counting;
//   * 24 roles write "Complementary certifications:" as a bullet rather than a
//     subhead — a non-credential counted as one;
//   * 172 roles pack several credentials into one comma-joined bullet —
//     undercounting.
//
// These tests pin the reading of each shape, so the batch sizes derived from
// the inventory are trustworthy.

function fixture(body) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cred-inv-'));
    const file = path.join(dir, 'role.md');
    // Role files carry a BOM and CRLF endings.
    fs.writeFileSync(file, `﻿# Role\n\n${body}\n`.replace(/\n/g, '\r\n'));
    return file;
}

test('certificationSection reads the section despite a BOM and CRLF endings', () => {
    const file = fixture([
        '## Recommended Certifications & Learning Paths',
        '',
        '- Certified Kubernetes Administrator (CKA)',
        '',
        '## Next Section',
        '',
        '- Not a credential',
    ].join('\n'));

    const section = certificationSection(fs.readFileSync(file, 'utf8'));
    assert.match(section, /Certified Kubernetes Administrator/);
    assert.doesNotMatch(section, /Not a credential/);
});

test('learning-resource subheads are excluded from credential entries', () => {
    const file = fixture([
        '## Recommended Certifications & Learning Paths',
        '',
        '**Core Certifications:**',
        '',
        '- Certified Kubernetes Administrator (CKA)',
        '',
        '**Learning Resources and Communities:**',
        '',
        '- Postman Learning Center',
    ].join('\n'));

    const entries = inventoryRole(fs.readFileSync(file, 'utf8'));
    assert.deepEqual(entries.map(e => e.name), ['Certified Kubernetes Administrator (CKA)']);
});

test('a bullet ending in a colon is a subhead, not a credential', () => {
    const file = fixture([
        '## Recommended Certifications & Learning Paths',
        '',
        '- Complementary certifications:',
        '  - Docker Certified Associate',
    ].join('\n'));

    const entries = inventoryRole(fs.readFileSync(file, 'utf8'));
    assert.deepEqual(entries.map(e => e.name), ['Docker Certified Associate']);
});

test('a comma-joined bullet is split into one entry per credential', () => {
    const file = fixture([
        '## Recommended Certifications & Learning Paths',
        '',
        '- Docker Certified Associate, CompTIA Security+, and ITIL 4 Foundation',
    ].join('\n'));

    const entries = inventoryRole(fs.readFileSync(file, 'utf8'));
    assert.deepEqual(
        entries.map(e => e.name),
        ['Docker Certified Associate', 'CompTIA Security+', 'ITIL 4 Foundation'],
    );
});

test('a comma inside a credential name does not split it', () => {
    const file = fixture([
        '## Recommended Certifications & Learning Paths',
        '',
        '- Oracle Certified Master, Java Architect',
    ].join('\n'));

    const entries = inventoryRole(fs.readFileSync(file, 'utf8'));
    assert.deepEqual(entries.map(e => e.name), ['Oracle Certified Master, Java Architect']);
});

test('an already-marked bullet is reported as migrated, not as legacy text', () => {
    const file = fixture([
        '## Recommended Certifications & Learning Paths',
        '',
        '- Certified Kubernetes Administrator (CKA) <!-- credential: cncf-cka -->',
    ].join('\n'));

    const entries = inventoryRole(fs.readFileSync(file, 'utf8'));
    assert.equal(entries.length, 1);
    assert.equal(entries[0].marked, true);
    assert.equal(entries[0].credentialId, 'cncf-cka');
    assert.equal(entries[0].name, 'Certified Kubernetes Administrator (CKA)');
});

// Stripping comments in a single pass leaves a marker behind when one comment
// encloses another: removing the inner `<!-- x -->` re-forms nothing, but the
// outer opener survives into the credential name.
test('a nested comment is stripped completely, leaving no marker in the name', () => {
    const file = fixture([
        '## Recommended Certifications & Learning Paths',
        '',
        '- CompTIA Security+ <!--<!-- stray -->-->',
    ].join('\n'));

    const entries = inventoryRole(fs.readFileSync(file, 'utf8'));
    assert.equal(entries.length, 1);
    assert.equal(entries[0].name, 'CompTIA Security+');
    assert.doesNotMatch(entries[0].name, /<!--/);
});

test('aliasKey groups the spellings of one credential', () => {
    const key = aliasKey('Microsoft Certified: Identity and Access Administrator Associate (SC-300)');
    assert.equal(aliasKey('Microsoft Certified: Identity and Access Administrator'), key);
    assert.equal(aliasKey('Microsoft Certified: Identity and Access Administrator Associate'), key);
});

test('aliasKey keeps genuinely different credentials apart', () => {
    assert.notEqual(aliasKey('Certified Kubernetes Administrator (CKA)'), aliasKey('Certified Kubernetes Application Developer (CKAD)'));
});

test('classifyEntry separates credentials from families, topics and vague claims', () => {
    assert.equal(classifyEntry('Certified Kubernetes Administrator (CKA)'), 'credential');
    assert.equal(classifyEntry('ITIL Service Management certifications'), 'family');
    assert.equal(classifyEntry('Cloud platform associate certifications'), 'family');
    assert.equal(classifyEntry('TOGAF or other enterprise architecture certification'), 'vague');
    assert.equal(classifyEntry('Web security fundamentals'), 'topic');
    assert.equal(classifyEntry('Docker and container basics'), 'topic');
});
