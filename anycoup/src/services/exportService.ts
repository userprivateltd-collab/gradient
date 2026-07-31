import { jsPDF } from 'jspdf';
import { VideoAnalysis } from '../types/video';

/**
 * Export Analysis as Markdown (.md) document
 */
export function exportToMarkdown(analysis: VideoAnalysis): void {
  const v = analysis.video;
  const e = analysis.entities;
  const r = analysis.resources;

  const content = `# AI Video Analysis Report: ${v.title}

**Platform:** ${v.platform.toUpperCase()}  
**Creator:** ${v.creator.name} (${v.creator.handle})  
**Video URL:** ${v.url}  
**Duration:** ${v.duration} | **Views:** ${v.viewCount} | **Likes:** ${v.likeCount}  
**Analysis Date:** ${new Date(analysis.analyzedAt).toLocaleString()}  

---

## 📌 Executive AI Summary
${analysis.aiSummary}

---

## 🚀 AI Resource Finder (Mentions & Links)
${r
  .map(
    (res) =>
      `- **[${res.category.toUpperCase()}] ${res.name}**: ${res.description} ${
        res.url ? `([Link](${res.url}))` : ''
      } ${res.pricing ? `*(${res.pricing})*` : ''}`
  )
  .join('\n')}

---

## 💡 Key Learning Points
${analysis.learningPoints.map((lp, i) => `${i + 1}. ${lp}`).join('\n')}

---

## 🎯 Action Steps Checklist
${analysis.actionSteps.map((step) => `- [${step.completed ? 'x' : ' '}] ${step.step}`).join('\n')}

---

## 📊 Categorized Entity Extraction

### Websites Mentioned
${e.websites.length > 0 ? e.websites.map((w) => `- ${w}`).join('\n') : '*None detected*'}

### Apps & Tools Mentioned
${e.tools.length > 0 ? e.tools.map((t) => `- ${t}`).join('\n') : '*None detected*'}

### Programming Languages
${e.programmingLanguages.length > 0 ? e.programmingLanguages.map((l) => `- ${l}`).join('\n') : '*None detected*'}

### Products, People & Companies
- **People:** ${e.people.join(', ') || 'N/A'}
- **Companies:** ${e.companies.join(', ') || 'N/A'}
- **Products:** ${e.products.join(', ') || 'N/A'}

### Money & Pricing Mentioned
${e.moneyMentioned.length > 0 ? e.moneyMentioned.map((m) => `- ${m}`).join('\n') : '*None detected*'}

### Contact Info (Links, Emails, Phones)
- **Links:** ${e.links.join(', ') || 'N/A'}
- **Emails:** ${e.emails.join(', ') || 'N/A'}
- **Phones:** ${e.phoneNumbers.join(', ') || 'N/A'}

### Hashtags & Usernames
- **Hashtags:** ${e.hashtags.join(' ')}
- **Usernames:** ${e.usernames.join(', ')}

---

## ❓ Questions Answered
${analysis.questionsAnswered
  .map((q) => `### Q: ${q.question}\n**A:** ${q.answer}`)
  .join('\n\n')}

---

## ⏱️ Video Timeline Events
${analysis.timeline.map((item) => `- **[${item.timestamp}] ${item.title}**: ${item.description}`).join('\n')}

---

## 📝 Full Transcript
${analysis.transcript.map((t) => `**[${t.timestamp}]** ${t.text}`).join('\n\n')}

---
*Report generated automatically by OmniVideo AI Analyzer.*
`;

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `video-analysis-${v.id}.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export Analysis as JSON document
 */
export function exportToJSON(analysis: VideoAnalysis): void {
  const content = JSON.stringify(analysis, null, 2);
  const blob = new Blob([content], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `video-analysis-${analysis.video.id}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export Analysis as PDF document using jsPDF
 */
export function exportToPDF(analysis: VideoAnalysis): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const v = analysis.video;
  let y = 15;

  // Title & Header
  doc.setFontSize(18);
  doc.setTextColor(99, 102, 241); // Brand Indigo
  doc.text('OmniVideo AI - Video Analysis Report', 14, y);

  y += 10;
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text(`Title: ${v.title.substring(0, 55)}...`, 14, y);

  y += 6;
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Platform: ${v.platform.toUpperCase()} | Creator: ${v.creator.name} | Duration: ${v.duration}`, 14, y);

  y += 10;
  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, 196, y);

  // AI Summary
  y += 8;
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('AI Executive Summary', 14, y);

  y += 6;
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(analysis.aiSummary, 180);
  doc.text(summaryLines, 14, y);
  y += summaryLines.length * 5 + 6;

  // AI Resource Finder Section
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('AI Resource Finder (Tools, Apps & Websites)', 14, y);

  y += 6;
  doc.setFontSize(10);
  analysis.resources.forEach((res) => {
    if (y > 270) {
      doc.addPage();
      y = 15;
    }
    doc.setTextColor(79, 70, 229);
    doc.text(`• [${res.category.toUpperCase()}] ${res.name}`, 14, y);
    doc.setTextColor(71, 85, 105);
    const descLines = doc.splitTextToSize(res.description, 160);
    doc.text(descLines, 20, y + 4);
    y += descLines.length * 4 + 6;
  });

  // Learning Points
  y += 4;
  if (y > 270) {
    doc.addPage();
    y = 15;
  }
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('Key Learning Points', 14, y);

  y += 6;
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  analysis.learningPoints.forEach((lp, idx) => {
    if (y > 270) {
      doc.addPage();
      y = 15;
    }
    const lines = doc.splitTextToSize(`${idx + 1}. ${lp}`, 180);
    doc.text(lines, 14, y);
    y += lines.length * 5;
  });

  // Action Steps
  y += 6;
  if (y > 270) {
    doc.addPage();
    y = 15;
  }
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('Action Steps Checklist', 14, y);

  y += 6;
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  analysis.actionSteps.forEach((step) => {
    if (y > 270) {
      doc.addPage();
      y = 15;
    }
    const lines = doc.splitTextToSize(`[${step.completed ? '✓' : '  '}] ${step.step}`, 180);
    doc.text(lines, 14, y);
    y += lines.length * 5;
  });

  // Footer
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Page ${i} of ${totalPages} - Generated by OmniVideo AI`, 14, 287);
  }

  doc.save(`video-analysis-${v.id}.pdf`);
}
