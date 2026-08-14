const test = require('node:test');
const assert = require('node:assert/strict');

const { addProvenanceFields } = require('../scripts/backfill-review-provenance.js');

// #179 adds Content Owner and Review Status to every role. The backfill states
// the honest position rather than a flattering one: 206 of 226 roles shared a
// single Last Reviewed month, so their dates record a bulk edit and the status
// says so. An owner promotes a role to "reviewed" by actually reviewing it.

const META = [
    '# Test Role',
    '',
    '| Field | Value |',
    '|---|---|',
    '| **Domain** | Kubernetes |',
    '| **Role Level** | Engineer |',
    '| **Reports To** | Senior Engineer |',
    '| **Direct Reports** | None |',
    '| **Last Reviewed** | 2026-03 |',
    '',
    '---',
    '',
    '## Role Overview',
    '',
    'Text.',
    '',
].join('\n');

test('the provenance fields are added above Last Reviewed', () => {
    const out = addProvenanceFields(META);
    const lines = out.split('\n');
    const owner = lines.findIndex(l => l.includes('**Content Owner**'));
    const status = lines.findIndex(l => l.includes('**Review Status**'));
    const reviewed = lines.findIndex(l => l.includes('**Last Reviewed**'));

    assert.ok(owner !== -1 && status !== -1, 'both fields should be present');
    assert.ok(owner < reviewed && status < reviewed, 'provenance fields belong above the date they qualify');
});

test('the owner is a durable identifier, not a person', () => {
    assert.match(addProvenanceFields(META), /\|\s*\*\*Content Owner\*\*\s*\|\s*catalogue-maintainers\s*\|/);
});

test('an existing bulk-stamped date is labelled mechanical, not reviewed', () => {
    assert.match(addProvenanceFields(META), /\|\s*\*\*Review Status\*\*\s*\|\s*mechanical\s*\|/);
});

test('a role that already has the fields is left untouched', () => {
    const once = addProvenanceFields(META);
    assert.equal(addProvenanceFields(once), once);
});

test('nothing outside the metadata table changes', () => {
    const out = addProvenanceFields(META);
    assert.match(out, /## Role Overview\n\nText\./);
    assert.match(out, /\|\s*\*\*Reports To\*\*\s*\|\s*Senior Engineer\s*\|/);
    assert.equal(out.split('\n').length, META.split('\n').length + 2);
});

test('a document with no metadata table is returned unchanged', () => {
    const plain = '# Doc\n\nNo table here.\n';
    assert.equal(addProvenanceFields(plain), plain);
});
