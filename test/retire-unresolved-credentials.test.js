const test = require('node:test');
const assert = require('node:assert/strict');

const { applyRules } = require('../scripts/retire-unresolved-credentials.js');

// #229's rule: rewrite to the successor where one exists, drop where none does.
// ADR-0003 sends a successor that is a course to Learning Resources instead of
// the registry.
//
// The hazard these tests exist for is silent loss. Removing a bullet is easy;
// failing to re-add its replacement is invisible in a 15-file diff.

function doc(...body) {
    return ['# Role', '', '## Recommended Certifications & Learning Paths', '', ...body, '', '## Career Development Path', '', '- Next role', ''].join('\n');
}

test('a credential with no successor is dropped', () => {
    const { text, changes } = applyRules(doc('**Core Certifications:**', '', '- MCSE: Core Infrastructure', '- CompTIA Server+'));
    assert.doesNotMatch(text, /MCSE/);
    assert.match(text, /CompTIA Server\+/);
    assert.equal(changes.filter(c => c.action === 'drop').length, 1);
});

test('a credential whose successor is a course moves to learning resources', () => {
    const { text } = applyRules(doc(
        '**Core Certifications:**', '', '- Docker Certified Associate',
        '', '**Learning Resources & Communities:**', '', '- Existing resource',
    ));
    const [certs, learning] = text.split(/\*\*Learning Resources/);
    assert.doesNotMatch(certs, /Docker/, 'the certification bullet is gone');
    assert.match(learning, /Docker Foundations Professional Certificate/);
    assert.match(learning, /Existing resource/);
});

// 101 roles spell the subhead "and Communities" and 124 use "&". Matching one
// exactly removed the bullet and dropped its replacement in every role using
// the other -- caught only by counting insertions against deletions.
test('the learning subhead is found whichever way it is spelled', () => {
    for (const subhead of ['**Learning Resources & Communities:**', '**Learning Resources and Communities:**']) {
        const { text } = applyRules(doc('**Core Certifications:**', '', '- Docker Certified Associate', '', subhead, '', '- Existing resource'));
        assert.match(text, /Docker Foundations Professional Certificate/, `replacement lost with subhead: ${subhead}`);
    }
});

test('a role with no learning subhead gains one rather than losing the replacement', () => {
    const { text } = applyRules(doc('**Core Certifications:**', '', '- Docker Certified Associate'));
    assert.match(text, /\*\*Learning Resources & Communities:\*\*/);
    assert.match(text, /Docker Foundations Professional Certificate/);
    assert.match(text, /## Career Development Path/, 'the following section survives');
});

// The catalogue packs several credentials into one comma-joined bullet in 172
// roles. Acting on the whole line would delete live recommendations to remove a
// dead one.
test('a bullet naming several credentials is left for a human', () => {
    const line = '- Microsoft Certified: Azure Stack HCI Operator Associate, MCSE: Core Infrastructure, Microsoft Certified: Azure Administrator Associate';
    const { text, changes } = applyRules(doc('**Core Certifications:**', '', line));
    assert.match(text, /Azure Stack HCI Operator Associate/, 'valid credentials must survive');
    assert.match(text, /MCSE/, 'the line is untouched, not partially edited');
    assert.deepEqual(changes.map(c => c.action), ['manual']);
});

test('every removal is accounted for by a change entry', () => {
    const before = doc('**Core Certifications:**', '', '- MCSE: Core Infrastructure', '- Certified Agile Service Manager', '- CompTIA Server+');
    const { text, changes } = applyRules(before);
    const removed = before.split('\n').filter(l => /^\s*-\s+\S/.test(l)).length
        - text.split('\n').filter(l => /^\s*-\s+\S/.test(l)).length;
    assert.equal(removed, changes.filter(c => c.action === 'drop').length);
});

test('a role with nothing to change is returned untouched', () => {
    const before = doc('**Core Certifications:**', '', '- CompTIA Server+');
    const { text, changes } = applyRules(before);
    assert.equal(text, before);
    assert.deepEqual(changes, []);
});
