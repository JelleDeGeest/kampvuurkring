import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generateReceiptPDFFromHTML(element: HTMLElement, fileName: string): Promise<void> {
  try {
    // Apply CSS for better page break handling
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        .break-inside-avoid { 
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        .break-before-page {
          break-before: page !important;
          page-break-before: always !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Clone the element and prepare for better page handling
    const clonedElement = element.cloneNode(true) as HTMLElement;
    document.body.appendChild(clonedElement);
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.width = '794px'; // A4 width in pixels at 96 DPI
    
    // Force payment section to new page if near bottom
    const paymentSection = clonedElement.querySelector('[data-payment-section]');
    if (paymentSection) {
      const rect = paymentSection.getBoundingClientRect();
      const pageHeight = 1123; // A4 height in pixels at 96 DPI
      const positionOnPage = rect.top % pageHeight;
      
      // If payment section starts in last 25% of page, force new page
      if (positionOnPage > pageHeight * 0.75) {
        (paymentSection as HTMLElement).classList.add('break-before-page');
      }
    }

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(clonedElement, {
      scale: 2, // Higher resolution
      useCORS: true, // Allow cross-origin images
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: clonedElement.scrollWidth,
      windowHeight: clonedElement.scrollHeight,
    });

    // Clean up
    document.body.removeChild(clonedElement);
    document.head.removeChild(style);

    // Calculate PDF dimensions with margins
    const margin = 10; // 10mm margins
    const imgWidth = 210 - (2 * margin); // A4 width minus margins
    const pageHeight = 297 - (2 * margin); // A4 height minus margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add image to PDF with margins
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', margin, margin + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add new pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, margin + position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}