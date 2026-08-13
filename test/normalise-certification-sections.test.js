const test = require('node:test');
const assert = require('node:assert/strict');

const { normaliseSection } = require('../scripts/normalise-certification-sections.js');
const { inventoryRole } = require('../scripts/credential-inventory.js');

// #227 makes every certification section use one shape, so a later domain batch
// is not reconciling two lists and guessing which is authoritative.
//
// The transform moves and de-duplicates text. It must never add or remove a
// credential claim — that is the property every test here is really checking.

const HEADING = '## Recommended Certifications & Learning Paths';

function doc(...lines) {
    return `# Role\n\n${HEADING}\n\n${lines.join('\n')}\n`;
}

test('a leading flat list becomes the core certifications group', () => {
    const out = normaliseSection(doc(
        '- Certified Kubernetes Administrator (CKA)',
        '- CompTIA Security+',
    ));

    assert.match(out, /\*\*Core Certifications:\*\*/);
    assert.match(out, /- Certified Kubernetes Administrator \(CKA\)/);
    assert.match(out, /- CompTIA Security\+/);
});

test('an existing grouped section is left unchanged', () => {
    const already = doc(
        '**Core Certifications:**',
        '',
        '- Certified Kubernetes Administrator (CKA)',
        '',
        '**Learning Resources & Communities:**',
        '',
        '- Kubernetes docs',
    );

    assert.equal(normaliseSection(already), already);
});

test('a nested complementary bullet merges into the complementary group', () => {
    const out = normaliseSection(doc(
        '- Certified Kubernetes Administrator (CKA)',
        '- Complementary certifications:',
        '  - Docker Certified Associate',
        '',
        '**Complementary Certifications:**',
        '',
        '- CompTIA Security+',
    ));

    // The label bullet is gone, and both complementary entries sit in one group.
    assert.doesNotMatch(out, /- Complementary certifications:/);
    const complementary = out.split('**Complementary Certifications:**')[1];
    assert.match(complementary, /- Docker Certified Associate/);
    assert.match(complementary, /- CompTIA Security\+/);
    // Exactly one complementary group survives the merge.
    assert.equal(out.split('**Complementary Certifications:**').length - 1, 1);
});

test('a duplicated recommendation is kept once', () => {
    const out = normaliseSection(doc(
        '- CompTIA Security+',
        '- Complementary certifications:',
        '  - CompTIA Security+',
    ));

    assert.equal(out.split('CompTIA Security+').length - 1, 1);
});

test('the learning resources heading is spelled one way', () => {
    const out = normaliseSection(doc(
        '**Learning Resources and Communities:**',
        '',
        '- Kubernetes docs',
    ));

    assert.match(out, /\*\*Learning Resources & Communities:\*\*/);
    assert.doesNotMatch(out, /Resources and Communities/);
});

test('a credential marker survives normalisation', () => {
    const out = normaliseSection(doc(
        '- Certified Kubernetes Administrator (CKA) <!-- credential: cncf-cka -->',
    ));

    assert.match(out, /<!-- credential: cncf-cka -->/);
});

test('no credential claim is added or removed', () => {
    const before = doc(
        '- AWS Certified Solutions Architect Professional (SAP-C02)',
        '- FinOps Certified Practitioner',
        '- Complementary certifications:',
        '  - Docker Certified Associate',
        '',
        '**Complementary Certifications:**',
        '',
        '- CompTIA Security+',
        '',
        '**Learning Resources and Communities:**',
        '',
        '- AWS Well-Architected Framework documentation',
    );

    const namesBefore = inventoryRole(before).map(e => e.name).sort();
    const namesAfter = inventoryRole(normaliseSection(before)).map(e => e.name).sort();
    assert.deepEqual(namesAfter, namesBefore);
});

test('content outside the certification section is untouched', () => {
    const source = `# Role\n\n## Key Technologies\n\n- Kubernetes\n\n${HEADING}\n\n- CompTIA Security+\n\n## Career Development Path\n\n- Senior engineer\n`;
    const out = normaliseSection(source);

    assert.match(out, /## Key Technologies\n\n- Kubernetes/);
    assert.match(out, /## Career Development Path\n\n- Senior engineer/);
});

test('a role with no certification section is returned unchanged', () => {
    const source = '# Role\n\n## Key Technologies\n\n- Kubernetes\n';
    assert.equal(normaliseSection(source), source);
});
