import jsPDF from 'jspdf';

interface ReceiptData {
  enrollmentId: string;
  targetTitle: string;
  targetType: string;
  children: Array<{
    participantInfo: {
      firstName: string;
      lastName: string;
    };
  }>;
  customAnswers?: Record<string, string>;
  comments?: string;
  totalPrice?: number;
  paymentInstructions?: string;
  isPaid?: boolean;
  startDate?: string;
  endDate?: string;
  division?: string | string[];
  createdAt?: string;
  bannerImage?: {
    url?: string;
  } | string;
}

export async function generateReceiptPDF(data: ReceiptData): Promise<jsPDF> {
  const doc = new jsPDF();
  
  // Colors
  const primaryColor = [37, 99, 235]; // RGB for #2563eb
  const textColor = [31, 41, 55]; // RGB for #1f2937
  const lightGray = [249, 250, 251]; // RGB for #f9fafb
  const borderGray = [229, 231, 235]; // RGB for #e5e7eb
  const greenBg = [220, 252, 231]; // Light green
  const greenText = [21, 128, 61]; // Dark green
  
  let yPos = 15;
  
  // Header - Scouts Sint-Johannes
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('Scouts Sint-Johannes', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Inschrijvingsbevestiging', 105, 30, { align: 'center' });
  
  yPos = 55;
  
  // Event Title
  doc.setTextColor(...textColor);
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.text(data.targetTitle, 105, yPos, { align: 'center' });
  yPos += 10;
  
  // Event details in a clean line
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  const details = [];
  
  if (data.division) {
    const divisions = Array.isArray(data.division) ? data.division.join(', ') : data.division;
    details.push(`Tak(ken): ${divisions}`);
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-BE');
  };
  
  if (data.startDate) {
    details.push(`Datum: ${formatDate(data.startDate)}${data.endDate && data.endDate !== data.startDate ? ` - ${formatDate(data.endDate)}` : ''}`);
  }
  
  if (details.length > 0) {
    doc.text(details.join(' • '), 105, yPos, { align: 'center' });
    yPos += 15;
  }
  
  // Success message box
  doc.setFillColor(...greenBg);
  doc.setDrawColor(...greenText);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, yPos, 170, 25, 3, 3, 'FD');
  
  doc.setTextColor(...greenText);
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text('✓ Inschrijving succesvol ontvangen!', 105, yPos + 10, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('We hebben je inschrijving goed ontvangen en verwerkt.', 105, yPos + 18, { align: 'center' });
  
  yPos += 35;
  
  // Main content area
  doc.setDrawColor(...borderGray);
  doc.setLineWidth(0.2);
  
  // Participants Section
  doc.setFillColor(...lightGray);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setTextColor(...textColor);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Ingeschreven deelnemers', 25, yPos + 5);
  yPos += 8;
  
  doc.setFillColor(255, 255, 255);
  const participantsHeight = 5 + (data.children.length * 7);
  doc.rect(20, yPos, 170, participantsHeight, 'F');
  doc.rect(20, yPos, 170, participantsHeight, 'S');
  
  yPos += 5;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  data.children.forEach((child, index) => {
    const childNum = data.children.length > 1 ? `${index + 1}. ` : '';
    doc.text(`${childNum}${child.participantInfo.firstName} ${child.participantInfo.lastName}`, 25, yPos);
    yPos += 7;
  });
  
  yPos += 10;
  
  // Contact Information Section
  if (data.customAnswers && Object.keys(data.customAnswers).length > 0) {
    doc.setFillColor(...lightGray);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Contactgegevens en extra informatie', 25, yPos + 5);
    yPos += 8;
    
    // Calculate height needed
    let infoHeight = 5;
    Object.entries(data.customAnswers).forEach(([_, answer]) => {
      const lines = doc.splitTextToSize(String(answer), 160);
      infoHeight += 12 + (lines.length * 5);
    });
    
    doc.setFillColor(255, 255, 255);
    doc.rect(20, yPos, 170, Math.min(infoHeight, 250 - yPos), 'F');
    doc.rect(20, yPos, 170, Math.min(infoHeight, 250 - yPos), 'S');
    
    yPos += 5;
    doc.setFontSize(10);
    
    Object.entries(data.customAnswers).forEach(([question, answer]) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFont(undefined, 'bold');
      doc.text(question, 25, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 5;
      
      const lines = doc.splitTextToSize(String(answer), 160);
      lines.forEach((line: string) => {
        doc.text(line, 25, yPos);
        yPos += 5;
      });
      yPos += 2;
    });
    
    yPos += 8;
  }
  
  // Comments Section
  if (data.comments && data.comments.trim()) {
    doc.setFillColor(...lightGray);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Opmerkingen', 25, yPos + 5);
    yPos += 8;
    
    const commentLines = doc.splitTextToSize(data.comments, 160);
    const commentsHeight = 5 + (commentLines.length * 5);
    
    doc.setFillColor(255, 255, 255);
    doc.rect(20, yPos, 170, commentsHeight, 'F');
    doc.rect(20, yPos, 170, commentsHeight, 'S');
    
    yPos += 5;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    commentLines.forEach((line: string) => {
      doc.text(line, 25, yPos);
      yPos += 5;
    });
    
    yPos += 10;
  }
  
  // Payment Section
  if (data.isPaid && data.totalPrice) {
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }
    
    // Yellow payment box
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(251, 191, 36);
    doc.setLineWidth(0.5);
    
    let paymentHeight = 30;
    if (data.paymentInstructions) {
      const instructionLines = doc.splitTextToSize(data.paymentInstructions, 160);
      paymentHeight += (instructionLines.length * 5);
    }
    
    doc.roundedRect(20, yPos, 170, paymentHeight, 3, 3, 'FD');
    
    doc.setTextColor(146, 64, 14);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Betalingsinformatie', 30, yPos + 10);
    
    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.text(`Te betalen: €${data.totalPrice}`, 30, yPos + 20);
    
    if (data.paymentInstructions) {
      yPos += 25;
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const instructionLines = doc.splitTextToSize(data.paymentInstructions, 160);
      instructionLines.forEach((line: string) => {
        doc.text(line, 30, yPos);
        yPos += 5;
      });
    }
    
    yPos += paymentHeight + 10;
  }
  
  // Footer information
  doc.setDrawColor(...borderGray);
  doc.setLineWidth(0.2);
  doc.line(20, 270, 190, 270);
  
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text(`Inschrijvingsnummer: ${data.enrollmentId}`, 20, 277);
  
  if (data.createdAt) {
    const timestamp = new Date(data.createdAt).toLocaleString('nl-BE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Datum: ${timestamp}`, 190, 277, { align: 'right' });
  }
  
  doc.setFontSize(8);
  doc.text('Dit is een automatisch gegenereerd document. Bewaar dit als bevestiging van je inschrijving.', 105, 285, { align: 'center' });
  
  return doc;
}