// ===== FILE STORAGE =====
var uploadedFiles = { a: [], b: [] };

// ===== INIT GAUGES =====
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gauge-boxes[data-gauge]').forEach(function(container) {
        var key = container.dataset.gauge;
        for (var i = 0; i < 10; i++) {
            var cell = document.createElement('div');
            cell.className = 'gauge-cell';
            cell.dataset.index = i;
            cell.textContent = '';
            cell.addEventListener('click', (function(container, cell) {
                return function() {
                    var cells = container.querySelectorAll('.gauge-cell');
                    var clickedIdx = parseInt(cell.dataset.index);
                    var allFilled = true;
                    cells.forEach(function(c, idx) {
                        if (idx <= clickedIdx) {
                            if (!c.classList.contains('filled')) allFilled = false;
                        } else {
                            if (c.classList.contains('filled')) allFilled = false;
                        }
                    });
                    if (allFilled && cell.classList.contains('filled')) {
                        cells.forEach(function(c, idx) {
                            c.classList.remove('filled');
                            c.textContent = '';
                            if (idx < clickedIdx) {
                                c.classList.add('filled');
                                c.textContent = 'x';
                            }
                        });
                    } else {
                        cells.forEach(function(c, idx) {
                            if (idx <= clickedIdx) {
                                c.classList.add('filled');
                                c.textContent = 'x';
                            } else {
                                c.classList.remove('filled');
                                c.textContent = '';
                            }
                        });
                    }
                };
            })(container, cell));
            container.appendChild(cell);
        }
    });

    // Auto-resize textareas
    document.addEventListener('input', function(e) {
        if (e.target.tagName === 'TEXTAREA') autoResize(e.target);
    });

    // Six-word title sync
    var sixWordA = document.getElementById('six-word-input-a');
    var sixWordB = document.getElementById('six-word-input-b');
    if (sixWordA) {
        sixWordA.addEventListener('input', function() {
            document.getElementById('header-title-a').textContent = this.value || '"Your six-word title here"';
        });
    }
    if (sixWordB) {
        sixWordB.addEventListener('input', function() {
            document.getElementById('header-title-b').textContent = this.value || '"Your six-word title here"';
        });
    }
});

function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

// ===== ITEM MANAGEMENT =====
function addItem(btn, bullet, isGap, bulletColor) {
    if (isGap === undefined) isGap = false;
    if (bulletColor === undefined) bulletColor = null;
    var list = btn.previousElementSibling;
    var div = document.createElement('div');
    div.className = 'editable-item';
    var colorStyle = bulletColor ? ' style="color:' + bulletColor + ';"' : (isGap ? ' style="color:#dc2626;"' : '');
    div.innerHTML = '<span class="bullet"' + colorStyle + '>' + bullet + '</span><textarea rows="1" class="' + (isGap ? 'gap' : '') + '" placeholder="Type here..."></textarea><button class="remove-item-btn" onclick="removeItem(this)">&times;</button>';
    list.appendChild(div);
    div.querySelector('textarea').focus();
}

function removeItem(btn) {
    var item = btn.closest('.editable-item');
    var list = item.parentElement;
    if (list.querySelectorAll('.editable-item').length > 1) {
        item.remove();
    }
}

// ===== FILE UPLOAD =====
function handleFileUpload(input, plan) {
    var files = Array.from(input.files);
    files.forEach(function(file) {
        var url = URL.createObjectURL(file);
        uploadedFiles[plan].push({ name: file.name, url: url, size: file.size, file: file });
        renderFiles(plan);
    });
    input.value = '';
}

function renderFiles(plan) {
    var container = document.getElementById(plan + '-files-list');
    container.innerHTML = '';
    uploadedFiles[plan].forEach(function(f, idx) {
        var ext = f.name.split('.').pop().toLowerCase();
        var icon = '&#128196;';
        if (ext === 'pdf') icon = '&#128213;';
        else if (['xlsx','xls','csv'].indexOf(ext) >= 0) icon = '&#128202;';
        else if (['jpg','png','gif','jpeg'].indexOf(ext) >= 0) icon = '&#128247;';
        else if (['doc','docx'].indexOf(ext) >= 0) icon = '&#128196;';
        else if (['pptx','ppt'].indexOf(ext) >= 0) icon = '&#128218;';

        var div = document.createElement('div');
        div.className = 'embedded-doc';
        div.innerHTML = '<span class="icon">' + icon + '</span><a href="' + f.url + '" target="_blank" class="file-name" style="color:#3b82f6; text-decoration:none;">' + f.name + '</a><span class="remove-file" onclick="removeFile(\'' + plan + '\', ' + idx + ')">&times;</span>';
        container.appendChild(div);
    });
}

function removeFile(plan, idx) {
    URL.revokeObjectURL(uploadedFiles[plan][idx].url);
    uploadedFiles[plan].splice(idx, 1);
    renderFiles(plan);
}

// ===== TAB SWITCHING =====
function switchPlan(plan) {
    document.querySelectorAll('.plan-section').forEach(function(s) { s.classList.remove('active'); });
    document.querySelectorAll('.plan-tab').forEach(function(t) { t.classList.remove('active-a', 'active-b'); });
    document.getElementById('plan-' + plan).classList.add('active');
    document.getElementById('tab-' + plan).classList.add(plan === 'a' ? 'active-a' : 'active-b');
}

// ===== COLLECT ALL DATA =====
function collectPlanData(plan) {
    var section = document.getElementById('plan-' + plan);
    var data = {};

    // Simple fields
    section.querySelectorAll('[data-field]').forEach(function(el) {
        data[el.dataset.field] = el.value;
    });

    // Item lists
    section.querySelectorAll('.item-list').forEach(function(list) {
        var items = [];
        list.querySelectorAll('.editable-item textarea').forEach(function(ta) {
            if (ta.value.trim()) items.push(ta.value.trim());
        });
        data[list.id] = items;
    });

    // Gauges
    section.querySelectorAll('.gauge-boxes[data-gauge]').forEach(function(g) {
        data[g.dataset.gauge] = g.querySelectorAll('.gauge-cell.filled').length;
    });

    // Files
    data.files = uploadedFiles[plan].map(function(f) { return f.name; });

    return data;
}

// ===== SAVE / LOAD DRAFT =====
function saveDraft() {
    var draft = { a: collectPlanData('a'), b: collectPlanData('b') };
    localStorage.setItem('odyssey-plan-draft', JSON.stringify(draft));
    showToast('Draft saved!');
}

function loadDraft() {
    var raw = localStorage.getItem('odyssey-plan-draft');
    if (!raw) { showToast('No saved draft found.'); return; }
    var draft = JSON.parse(raw);

    ['a', 'b'].forEach(function(plan) {
        if (!draft[plan]) return;
        var d = draft[plan];
        var section = document.getElementById('plan-' + plan);

        // Restore simple fields
        section.querySelectorAll('[data-field]').forEach(function(el) {
            if (d[el.dataset.field] !== undefined) {
                el.value = d[el.dataset.field];
                el.dispatchEvent(new Event('input'));
            }
        });

        // Restore item lists
        section.querySelectorAll('.item-list').forEach(function(list) {
            if (d[list.id] && d[list.id].length > 0) {
                var existing = list.querySelectorAll('.editable-item');
                var firstItem = existing[0];
                var bullet = firstItem.querySelector('.bullet').innerHTML;
                var bulletColor = firstItem.querySelector('.bullet').style.color;
                var isGap = firstItem.querySelector('textarea').classList.contains('gap');

                list.innerHTML = '';
                d[list.id].forEach(function(text) {
                    var div = document.createElement('div');
                    div.className = 'editable-item';
                    var colorStyle = bulletColor ? ' style="color:' + bulletColor + ';"' : '';
                    div.innerHTML = '<span class="bullet"' + colorStyle + '>' + bullet + '</span><textarea rows="1" class="' + (isGap ? 'gap' : '') + '">' + text + '</textarea><button class="remove-item-btn" onclick="removeItem(this)">&times;</button>';
                    list.appendChild(div);
                    autoResize(div.querySelector('textarea'));
                });
            }
        });

        // Restore gauges
        section.querySelectorAll('.gauge-boxes[data-gauge]').forEach(function(g) {
            var val = d[g.dataset.gauge];
            if (val !== undefined) {
                g.querySelectorAll('.gauge-cell').forEach(function(c, i) {
                    if (i < val) { c.classList.add('filled'); c.textContent = 'x'; }
                    else { c.classList.remove('filled'); c.textContent = ''; }
                });
            }
        });
    });

    showToast('Draft loaded!');
}

// ===== TOAST =====
function showToast(msg) {
    var toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 2500);
}

// ===== EXPORT MODAL =====
function openExportModal() { document.getElementById('export-modal').classList.add('active'); }
function closeExportModal() { document.getElementById('export-modal').classList.remove('active'); }

// ===== GENERATE PLAN HTML (for export) =====
function generatePlanHTML(plan) {
    var d = collectPlanData(plan);
    var color = plan === 'a' ? '#1e3a5f' : '#7c3aed';
    var planLabel = plan === 'a' ? 'Odyssey Plan A: your current/default path' : 'Odyssey Plan B: your best alternative path';
    var sixWord = d[plan + '-six-word'] || '';

    function renderItems(listId) {
        var items = d[listId] || [];
        var section = document.getElementById('plan-' + plan);
        var list = section.querySelector('#' + listId);
        if (!list) return '';
        var html = '';
        var firstBullet = list.querySelector('.bullet');
        var bulletChar = firstBullet ? firstBullet.textContent.trim() : '\u25CF';
        var bulletColor = firstBullet ? firstBullet.style.color : '';
        var isGap = list.querySelector('textarea.gap') !== null;
        items.forEach(function(item) {
            html += '<div style="display:flex;gap:6px;margin-bottom:4px;font-size:12px;line-height:1.7;' + (isGap ? 'color:#dc2626;font-style:italic;' : 'color:#334155;') + '"><span style="flex-shrink:0;' + (bulletColor ? 'color:' + bulletColor + ';' : '') + '">' + bulletChar + '</span><span>' + item + '</span></div>';
        });
        return html;
    }

    function renderGauge(key) {
        var val = d[plan + '-' + key] || 0;
        var html = '<div style="display:flex;gap:2px;">';
        for (var i = 0; i < 10; i++) {
            html += '<div style="width:14px;height:14px;border:1px solid ' + (i < val ? color : '#cbd5e1') + ';border-radius:2px;' + (i < val ? 'background:' + color + ';color:white;' : '') + 'font-size:8px;display:flex;align-items:center;justify-content:center;font-weight:700;">' + (i < val ? 'x' : '') + '</div>';
        }
        html += '</div>';
        return html;
    }

    // Get section headers from the actual DOM
    var section = document.getElementById('plan-' + plan);
    var colContents = section.querySelectorAll('.col-content');

    function getColHTML(colIdx) {
        var col = colContents[colIdx];
        if (!col) return '';
        var html = '';
        var title = col.querySelector('.font-big-input');
        var subtitle = col.querySelector('.font-medium-input');
        if (title) html += '<div style="font-size:18px;font-weight:800;color:' + color + ';">' + (title.value || '') + '</div>';
        if (subtitle) html += '<div style="font-size:13px;font-weight:600;color:#475569;margin-bottom:8px;">' + (subtitle.value || '') + '</div>';

        col.querySelectorAll('h4').forEach(function(h4) {
            html += '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:' + color + ';margin:12px 0 6px;padding-bottom:4px;border-bottom:1px solid #e2e8f0;">' + h4.textContent + '</div>';
            var nextList = h4.nextElementSibling;
            if (nextList && nextList.classList.contains('item-list')) {
                html += renderItems(nextList.id);
            }
        });
        return html;
    }

    var filesHTML = (d.files || []).map(function(name) {
        return '<div style="background:#f8fafc;border:1px dashed #cbd5e1;border-radius:6px;padding:8px 10px;margin-bottom:6px;font-size:10px;color:#64748b;display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">&#128196;</span>' + name + '</div>';
    }).join('');

    return '<div style="background:white;border:3px solid ' + color + ';font-family:Inter,sans-serif;page-break-after:always;">' +
        '<div style="background:' + color + ';color:white;padding:14px 24px;font-size:16px;font-weight:600;display:flex;justify-content:space-between;align-items:center;">' +
            '<span>' + planLabel + '</span>' +
            '<div style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:6px;padding:4px 14px;font-size:13px;font-style:italic;">' +
                '<div style="font-size:9px;text-transform:uppercase;letter-spacing:1px;opacity:0.7;font-weight:600;font-style:normal;">6-Word Title</div>' +
                (sixWord ? '"' + sixWord + '"' : '') +
            '</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;">' +
            '<div style="background:#f1f5f9;padding:10px 16px;font-size:12px;font-weight:700;color:' + color + ';border-bottom:2px solid #e2e8f0;border-right:1px solid #e2e8f0;">My Assessment of Where I am Now</div>' +
            '<div style="background:#f1f5f9;padding:10px 16px;font-size:12px;font-weight:700;color:' + color + ';border-bottom:2px solid #e2e8f0;border-right:1px solid #e2e8f0;">Stage 1: What Do I Need to Do Next?</div>' +
            '<div style="background:#f1f5f9;padding:10px 16px;font-size:12px;font-weight:700;color:' + color + ';border-bottom:2px solid #e2e8f0;border-right:1px solid #e2e8f0;">Stage 2: Where Do I Need to Be at Graduation?</div>' +
            '<div style="background:#f1f5f9;padding:10px 16px;font-size:12px;font-weight:700;color:' + color + ';border-bottom:2px solid #e2e8f0;">Stage 3: What is My 5-Year Destination?</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;">' +
            '<div style="padding:16px;border-right:1px solid #e2e8f0;">' + getColHTML(0) + '</div>' +
            '<div style="padding:16px;border-right:1px solid #e2e8f0;">' + getColHTML(1) + '</div>' +
            '<div style="padding:16px;border-right:1px solid #e2e8f0;">' + getColHTML(2) + '</div>' +
            '<div style="padding:16px;">' + getColHTML(3) + '</div>' +
        '</div>' +
        '<div style="border-top:2px solid #e2e8f0;display:grid;grid-template-columns:2fr 1fr 1fr;min-height:160px;">' +
            '<div style="padding:12px 16px;border-right:1px solid #e2e8f0;font-size:11px;">' +
                '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#94a3b8;margin-bottom:8px;">Embedded Evidence (double-click to open)</div>' +
                filesHTML +
            '</div>' +
            '<div style="padding:12px 16px;border-right:1px solid #e2e8f0;">' +
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
                    '<div style="border:1px solid #e2e8f0;border-radius:6px;padding:6px 8px;">' +
                        '<div style="font-size:9px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">Resources needed for plan</div>' +
                        renderGauge('resources') +
                        '<div style="font-size:8px;color:#94a3b8;font-style:italic;margin-top:3px;">' + (d[plan + '-resources-note'] || '') + '</div>' +
                    '</div>' +
                    '<div style="border:1px solid #e2e8f0;border-radius:6px;padding:6px 8px;">' +
                        '<div style="font-size:9px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">Confidence (in plan)</div>' +
                        renderGauge('confidence') +
                        '<div style="font-size:8px;color:#94a3b8;font-style:italic;margin-top:3px;">' + (d[plan + '-confidence-note'] || '') + '</div>' +
                    '</div>' +
                    '<div style="border:1px solid #e2e8f0;border-radius:6px;padding:6px 8px;">' +
                        '<div style="font-size:9px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">Do you like the plan?</div>' +
                        renderGauge('like') +
                        '<div style="font-size:8px;color:#94a3b8;font-style:italic;margin-top:3px;">' + (d[plan + '-like-note'] || '') + '</div>' +
                    '</div>' +
                    '<div style="border:1px solid #e2e8f0;border-radius:6px;padding:6px 8px;">' +
                        '<div style="font-size:9px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:4px;">Coherence (of plan)</div>' +
                        renderGauge('coherence') +
                        '<div style="font-size:8px;color:#94a3b8;font-style:italic;margin-top:3px;">' + (d[plan + '-coherence-note'] || '') + '</div>' +
                    '</div>' +
                '</div>' +
                '<div style="font-size:8px;color:#94a3b8;text-align:center;margin-top:4px;">put an "x" in box on all scales</div>' +
            '</div>' +
            '<div style="padding:12px 16px;">' +
                '<div style="background:' + color + ';color:white;padding:8px 12px;border-radius:6px;margin-bottom:10px;">' +
                    '<div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;opacity:0.7;margin-bottom:4px;">6 Word Title for Plan</div>' +
                    '<div style="font-size:13px;font-weight:700;">' + (sixWord ? '"' + sixWord + '"' : '') + '</div>' +
                '</div>' +
                '<div style="border:1px solid #e2e8f0;border-radius:6px;padding:8px 10px;">' +
                    '<div style="font-size:9px;font-weight:700;text-transform:uppercase;color:#94a3b8;margin-bottom:6px;">Questions/issues that this plan addresses:</div>' +
                    '<div style="font-size:10px;color:#334155;margin-bottom:4px;">' + (d[plan + '-q1'] || '') + '</div>' +
                    '<div style="font-size:10px;color:#334155;margin-bottom:4px;">' + (d[plan + '-q2'] || '') + '</div>' +
                    '<div style="font-size:10px;color:#334155;">' + (d[plan + '-q3'] || '') + '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div style="text-align:center;font-size:11px;color:#94a3b8;padding:8px;">' + (d[plan + '-student-info'] || '') + '</div>';
}

// ===== EXPORT AS HTML =====
function exportAsHTML() {
    var html = '<!DOCTYPE html>' +
        '<html lang="en"><head><meta charset="UTF-8"><title>Odyssey Plans</title>' +
        '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">' +
        '<style>@media print{body{margin:0;padding:0;}}<\/style>' +
        '</head><body style="font-family:Inter,sans-serif;padding:20px;background:white;">' +
        generatePlanHTML('a') +
        '<div style="height:40px;"></div>' +
        generatePlanHTML('b') +
        '</body></html>';

    var blob = new Blob([html], { type: 'text/html' });
    downloadBlob(blob, 'Odyssey_Plans.html');
    closeExportModal();
    showToast('HTML exported!');
}

// ===== HELPER: Extract structured plan data from DOM =====
function getPlanSections(plan) {
    var d = collectPlanData(plan);
    var section = document.getElementById('plan-' + plan);
    var cols = [];
    section.querySelectorAll('.col-content').forEach(function(col) {
        var colData = { title: '', subtitle: '', sections: [] };
        var titleEl = col.querySelector('.font-big-input');
        var subtitleEl = col.querySelector('.font-medium-input');
        if (titleEl) colData.title = titleEl.value || '';
        if (subtitleEl) colData.subtitle = subtitleEl.value || '';
        col.querySelectorAll('h4').forEach(function(h4) {
            var secData = { heading: h4.textContent, items: [], isGap: false, bullet: '\u25CF' };
            var nextList = h4.nextElementSibling;
            if (nextList && nextList.classList.contains('item-list')) {
                var fb = nextList.querySelector('.bullet');
                if (fb) secData.bullet = fb.textContent.trim();
                secData.isGap = nextList.querySelector('textarea.gap') !== null;
                nextList.querySelectorAll('.editable-item textarea').forEach(function(ta) {
                    if (ta.value.trim()) secData.items.push(ta.value.trim());
                });
            }
            colData.sections.push(secData);
        });
        cols.push(colData);
    });
    return {
        cols: cols,
        sixWord: d[plan + '-six-word'] || '',
        resources: d[plan + '-resources'] || 0,
        confidence: d[plan + '-confidence'] || 0,
        like: d[plan + '-like'] || 0,
        coherence: d[plan + '-coherence'] || 0,
        resourcesNote: d[plan + '-resources-note'] || '',
        confidenceNote: d[plan + '-confidence-note'] || '',
        likeNote: d[plan + '-like-note'] || '',
        coherenceNote: d[plan + '-coherence-note'] || '',
        q1: d[plan + '-q1'] || '',
        q2: d[plan + '-q2'] || '',
        q3: d[plan + '-q3'] || '',
        studentInfo: d[plan + '-student-info'] || '',
        files: d.files || []
    };
}

// ===== EXPORT AS WORD (.docx via docx library) =====
function exportAsWord() {
    if (typeof docx === 'undefined') {
        showToast('docx library not loaded. Check internet connection.');
        return;
    }
    var dataA = getPlanSections('a');
    var dataB = getPlanSections('b');

    function buildSection(plan, data) {
        var color = plan === 'a' ? '1E3A5F' : '7C3AED';
        var label = plan === 'a' ? 'Odyssey Plan A: your current/default path' : 'Odyssey Plan B: your best alternative path';
        var headers = [
            'My Assessment of Where I am Now',
            'Stage 1: What Do I Need to Do Next?',
            'Stage 2: Where Do I Need to Be at Graduation?',
            'Stage 3: What is My 5-Year Destination?'
        ];
        var children = [];

        // Title paragraph
        children.push(new docx.Paragraph({
            children: [new docx.TextRun({
                text: label + (data.sixWord ? '  \u2014  "' + data.sixWord + '"' : ''),
                bold: true, color: 'FFFFFF', size: 26, font: 'Calibri'
            })],
            shading: { type: docx.ShadingType.SOLID, color: color, fill: color },
            spacing: { after: 0 }
        }));

        // Column content builder
        function colParas(idx) {
            if (idx >= data.cols.length) return [new docx.Paragraph({})];
            var col = data.cols[idx];
            var p = [];
            if (col.title) p.push(new docx.Paragraph({
                children: [new docx.TextRun({ text: col.title, bold: true, color: color, size: 22, font: 'Calibri' })],
                spacing: { after: 40 }
            }));
            if (col.subtitle) p.push(new docx.Paragraph({
                children: [new docx.TextRun({ text: col.subtitle, color: '475569', size: 18, font: 'Calibri' })],
                spacing: { after: 80 }
            }));
            col.sections.forEach(function(sec) {
                p.push(new docx.Paragraph({
                    children: [new docx.TextRun({ text: sec.heading.toUpperCase(), bold: true, color: color, size: 14, font: 'Calibri' })],
                    spacing: { before: 80, after: 40 },
                    border: { bottom: { style: docx.BorderStyle.SINGLE, size: 1, color: 'E2E8F0' } }
                }));
                sec.items.forEach(function(item) {
                    p.push(new docx.Paragraph({
                        children: [new docx.TextRun({
                            text: sec.bullet + ' ' + item,
                            color: sec.isGap ? 'DC2626' : '334155',
                            italics: sec.isGap, size: 16, font: 'Calibri'
                        })],
                        spacing: { after: 20 }
                    }));
                });
            });
            if (p.length === 0) p.push(new docx.Paragraph({}));
            return p;
        }

        // Main 4-column table
        children.push(new docx.Table({
            rows: [
                new docx.TableRow({
                    children: headers.map(function(h) {
                        return new docx.TableCell({
                            children: [new docx.Paragraph({
                                children: [new docx.TextRun({ text: h, bold: true, color: 'FFFFFF', size: 16, font: 'Calibri' })]
                            })],
                            shading: { type: docx.ShadingType.SOLID, color: color, fill: color },
                            verticalAlign: docx.VerticalAlign.CENTER,
                            width: { size: 25, type: docx.WidthType.PERCENTAGE }
                        });
                    }),
                    tableHeader: true
                }),
                new docx.TableRow({
                    children: [0, 1, 2, 3].map(function(i) {
                        return new docx.TableCell({
                            children: colParas(i),
                            verticalAlign: docx.VerticalAlign.TOP,
                            width: { size: 25, type: docx.WidthType.PERCENTAGE }
                        });
                    })
                })
            ],
            width: { size: 100, type: docx.WidthType.PERCENTAGE }
        }));

        // Evidence paragraphs
        var evP = [new docx.Paragraph({
            children: [new docx.TextRun({ text: 'EMBEDDED EVIDENCE', bold: true, color: '94A3B8', size: 14, font: 'Calibri' })],
            spacing: { after: 40 }
        })];
        if (data.files.length > 0) {
            data.files.forEach(function(f) {
                evP.push(new docx.Paragraph({
                    children: [new docx.TextRun({ text: '\u2022 ' + f, color: '64748B', size: 14, font: 'Calibri' })],
                    spacing: { after: 20 }
                }));
            });
        } else {
            evP.push(new docx.Paragraph({
                children: [new docx.TextRun({ text: '(No files uploaded)', color: '94A3B8', italics: true, size: 14, font: 'Calibri' })]
            }));
        }

        // Gauge paragraphs
        function gP(lbl, val, note) {
            var boxes = '';
            for (var i = 0; i < 10; i++) boxes += i < val ? '\u25A0' : '\u25A1';
            var r = [
                new docx.Paragraph({
                    children: [new docx.TextRun({ text: lbl.toUpperCase(), bold: true, color: '64748B', size: 12, font: 'Calibri' })],
                    spacing: { before: 40, after: 10 }
                }),
                new docx.Paragraph({
                    children: [new docx.TextRun({ text: boxes + ' (' + val + '/10)', color: color, bold: true, size: 16, font: 'Calibri' })],
                    spacing: { after: 10 }
                })
            ];
            if (note) r.push(new docx.Paragraph({
                children: [new docx.TextRun({ text: note, color: '94A3B8', italics: true, size: 12, font: 'Calibri' })],
                spacing: { after: 20 }
            }));
            return r;
        }
        var gaP = [].concat(gP('Resources', data.resources, data.resourcesNote))
            .concat(gP('Confidence', data.confidence, data.confidenceNote))
            .concat(gP('Like plan?', data.like, data.likeNote))
            .concat(gP('Coherence', data.coherence, data.coherenceNote));

        // Title/Questions paragraphs
        var tqP = [
            new docx.Paragraph({
                children: [new docx.TextRun({ text: '6 WORD TITLE FOR PLAN', bold: true, color: 'FFFFFF', size: 14, font: 'Calibri' })],
                spacing: { after: 20 }
            }),
            new docx.Paragraph({
                children: [new docx.TextRun({ text: data.sixWord ? '"' + data.sixWord + '"' : '(Not set)', bold: true, color: 'FFFFFF', size: 20, font: 'Calibri' })],
                spacing: { after: 80 }
            }),
            new docx.Paragraph({
                children: [new docx.TextRun({ text: 'QUESTIONS:', bold: true, color: 'FFFFFF', size: 14, font: 'Calibri' })],
                spacing: { after: 20 }
            }),
            new docx.Paragraph({ children: [new docx.TextRun({ text: data.q1 || '\u2014', color: 'FFFFFF', size: 16, font: 'Calibri' })], spacing: { after: 20 } }),
            new docx.Paragraph({ children: [new docx.TextRun({ text: data.q2 || '\u2014', color: 'FFFFFF', size: 16, font: 'Calibri' })], spacing: { after: 20 } }),
            new docx.Paragraph({ children: [new docx.TextRun({ text: data.q3 || '\u2014', color: 'FFFFFF', size: 16, font: 'Calibri' })] })
        ];

        // Footer 3-column table
        children.push(new docx.Table({
            rows: [new docx.TableRow({
                children: [
                    new docx.TableCell({ children: evP, verticalAlign: docx.VerticalAlign.TOP, width: { size: 40, type: docx.WidthType.PERCENTAGE } }),
                    new docx.TableCell({ children: gaP, verticalAlign: docx.VerticalAlign.TOP, width: { size: 30, type: docx.WidthType.PERCENTAGE } }),
                    new docx.TableCell({ children: tqP, verticalAlign: docx.VerticalAlign.TOP, width: { size: 30, type: docx.WidthType.PERCENTAGE }, shading: { type: docx.ShadingType.SOLID, color: color, fill: color } })
                ]
            })],
            width: { size: 100, type: docx.WidthType.PERCENTAGE }
        }));

        // Student info
        children.push(new docx.Paragraph({
            children: [new docx.TextRun({ text: data.studentInfo, color: '94A3B8', size: 16, font: 'Calibri' })],
            alignment: docx.AlignmentType.CENTER,
            spacing: { before: 80 }
        }));

        return children;
    }

    var pageProps = {
        page: {
            size: { orientation: docx.PageOrientation.LANDSCAPE, width: 23811, height: 16838 },
            margin: { top: 567, bottom: 567, left: 567, right: 567 }
        }
    };

    var doc = new docx.Document({
        sections: [
            { properties: pageProps, children: buildSection('a', dataA) },
            { properties: pageProps, children: buildSection('b', dataB) }
        ]
    });

    docx.Packer.toBlob(doc).then(function(blob) {
        downloadBlob(blob, 'Odyssey_Plans.docx');
        closeExportModal();
        showToast('Word document exported!');
    });
}

// ===== EXPORT AS PPTX (PptxGenJS) =====
function exportAsPptx() {
    if (typeof PptxGenJS === 'undefined') {
        showToast('PptxGenJS library not loaded. Check internet connection.');
        return;
    }
    var pptx = new PptxGenJS();
    pptx.defineLayout({ name: 'A3', width: 16.54, height: 11.69 });
    pptx.layout = 'A3';

    addPptxSlide(pptx, 'a');
    addPptxSlide(pptx, 'b');

    pptx.writeFile({ fileName: 'Odyssey_Plans.pptx' }).then(function() {
        closeExportModal();
        showToast('PowerPoint exported!');
    });

    function addPptxSlide(pptx, plan) {
        var slide = pptx.addSlide();
        var data = getPlanSections(plan);
        var color = plan === 'a' ? '1E3A5F' : '7C3AED';
        var label = plan === 'a' ? 'Odyssey Plan A: your current/default path' : 'Odyssey Plan B: your best alternative path';
        var headers = [
            'My Assessment of Where I am Now',
            'Stage 1: What Do I Need to Do Next?',
            'Stage 2: Where Do I Need to Be at Graduation?',
            'Stage 3: What is My 5-Year Destination?'
        ];

        var mx = 0.2, my = 0.15;
        var W = 16.54 - 2 * mx;
        var cW = W / 4;

        // Title bar
        slide.addText(label + (data.sixWord ? '  \u2014  "' + data.sixWord + '"' : ''), {
            x: mx, y: my, w: W, h: 0.45,
            fill: { color: color }, color: 'FFFFFF',
            fontSize: 12, bold: true, valign: 'middle', margin: [0, 0, 0, 8]
        });

        // Column text builder
        function colText(idx) {
            if (idx >= data.cols.length) return [{ text: '' }];
            var col = data.cols[idx];
            var t = [];
            if (col.title) t.push({ text: col.title + '\n', options: { fontSize: 11, bold: true, color: color } });
            if (col.subtitle) t.push({ text: col.subtitle + '\n', options: { fontSize: 8, color: '475569' } });
            col.sections.forEach(function(sec) {
                t.push({ text: '\n' + sec.heading.toUpperCase() + '\n', options: { fontSize: 6.5, bold: true, color: color } });
                sec.items.forEach(function(item) {
                    t.push({ text: sec.bullet + ' ' + item + '\n', options: { fontSize: 7.5, color: sec.isGap ? 'DC2626' : '334155', italic: sec.isGap } });
                });
            });
            if (t.length === 0) t.push({ text: '' });
            return t;
        }

        // Main table: header row + content row
        var hRow = headers.map(function(h) {
            return { text: [{ text: h, options: { fontSize: 7, bold: true, color: 'FFFFFF' } }], options: { fill: { color: color }, valign: 'middle', margin: [3, 3, 3, 5] } };
        });
        var cRow = [0, 1, 2, 3].map(function(i) {
            return { text: colText(i), options: { valign: 'top', margin: [4, 4, 4, 5] } };
        });

        var tY = my + 0.45;
        var cH = 7.0;
        slide.addTable([hRow, cRow], {
            x: mx, y: tY, w: W,
            rowH: [0.28, cH],
            colW: [cW, cW, cW, cW],
            border: { type: 'solid', pt: 0.5, color: 'CBD5E1' },
            autoPage: false
        });

        // Footer
        var fY = tY + 0.28 + cH;
        var fH = 11.69 - fY - my - 0.25;
        var evW = W * 0.4, gaW = W * 0.3, tqW = W * 0.3;

        // Evidence text
        var evT = [{ text: 'EMBEDDED EVIDENCE\n', options: { fontSize: 6.5, bold: true, color: '94A3B8' } }];
        if (data.files.length > 0) {
            data.files.forEach(function(f) { evT.push({ text: '\u2022 ' + f + '\n', options: { fontSize: 7, color: '64748B' } }); });
        } else {
            evT.push({ text: '(No files uploaded)', options: { fontSize: 7, color: '94A3B8', italic: true } });
        }

        // Gauge text
        function gT(lbl, val, note) {
            var b = '';
            for (var i = 0; i < 10; i++) b += i < val ? '\u25A0' : '\u25A1';
            var r = [
                { text: lbl.toUpperCase() + '\n', options: { fontSize: 6, bold: true, color: '64748B' } },
                { text: b + ' (' + val + '/10)\n', options: { fontSize: 7.5, color: color, bold: true } }
            ];
            if (note) r.push({ text: note + '\n', options: { fontSize: 5.5, italic: true, color: '94A3B8' } });
            return r;
        }
        var gaT = [].concat(gT('Resources', data.resources, data.resourcesNote))
            .concat(gT('Confidence', data.confidence, data.confidenceNote))
            .concat(gT('Like plan?', data.like, data.likeNote))
            .concat(gT('Coherence', data.coherence, data.coherenceNote));

        // Title/Questions text
        var tqT = [
            { text: '6 WORD TITLE\n', options: { fontSize: 6.5, bold: true, color: 'FFFFFF' } },
            { text: (data.sixWord ? '"' + data.sixWord + '"' : '(Not set)') + '\n\n', options: { fontSize: 9, bold: true, color: 'FFFFFF' } },
            { text: 'QUESTIONS:\n', options: { fontSize: 6.5, bold: true, color: 'FFFFFF' } },
            { text: (data.q1 || '\u2014') + '\n', options: { fontSize: 7.5, color: 'FFFFFF' } },
            { text: (data.q2 || '\u2014') + '\n', options: { fontSize: 7.5, color: 'FFFFFF' } },
            { text: data.q3 || '\u2014', options: { fontSize: 7.5, color: 'FFFFFF' } }
        ];

        slide.addTable([[
            { text: evT, options: { valign: 'top', margin: [4, 4, 4, 5] } },
            { text: gaT, options: { valign: 'top', margin: [4, 4, 4, 5] } },
            { text: tqT, options: { valign: 'top', margin: [4, 4, 4, 5], fill: { color: color } } }
        ]], {
            x: mx, y: fY, w: W,
            rowH: [fH],
            colW: [evW, gaW, tqW],
            border: { type: 'solid', pt: 0.5, color: 'CBD5E1' },
            autoPage: false
        });

        // Student info
        slide.addText(data.studentInfo || '', {
            x: mx, y: fY + fH, w: W, h: 0.22,
            fontSize: 7, color: '94A3B8', align: 'center', valign: 'middle'
        });
    }
}

function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
