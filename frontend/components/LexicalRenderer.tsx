import React from 'react';

interface LexicalRendererProps {
  content: any;
  className?: string;
  truncate?: boolean;
  maxLength?: number;
}

export const LexicalRenderer: React.FC<LexicalRendererProps> = ({ 
  content, 
  className = '',
  truncate = false,
  maxLength = 250 
}) => {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  // Add console.log to help debug the structure
  console.log('Lexical content structure:', JSON.stringify(content, null, 2));

  return (
    <div className={className}>
      {content.root.children.map((node: any, i: number) => {
        // Handle different node types
        switch (node.type) {
          case 'heading':
            const level = node.tag || 1; // Default to h1 if tag is missing
            const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag 
                key={i} 
                className={`text-${7-level}xl font-bold my-${level} ${node.format || ''}`}
              >
                {renderTextContent(node)}
              </HeadingTag>
            );
            
          case 'list':
            const ListTag = node.listType === 'bullet' ? 'ul' : 'ol';
            return (
              <ListTag 
                key={i} 
                className={`${node.listType === 'bullet' ? 'list-disc' : 'list-decimal'} pl-6 my-4 ${node.format || ''}`}
              >
                {node.children?.map((item: any, j: number) => (
                  <li key={j} className="ml-2 pl-2">
                    {renderTextContent(item)}
                  </li>
                ))}
              </ListTag>
            );
            
          case 'listitem':
            return (
              <li key={i} className="ml-2 pl-2">
                {renderTextContent(node)}
              </li>
            );
            
          case 'quote':
            return (
              <blockquote 
                key={i} 
                className={`border-l-4 border-gray-300 pl-4 italic my-4 ${node.format || ''}`}
              >
                {renderTextContent(node)}
              </blockquote>
            );
            
          case 'paragraph':
          default:
            return (
              <p key={i} className={`my-2 ${node.format || ''}`}>
                {renderTextContent(node)}
              </p>
            );
        }
      })}
    </div>
  );
};

// Helper function to render text content with formatting
const renderTextContent = (node: any) => {
  if (!node.children || node.children.length === 0) {
    return node.text || null;
  }

  // Debug formatting for this node
  if (process.env.NODE_ENV !== 'production') {
    console.log('Node format info:', {
      type: node.type,
      format: node.format,
      styles: node.styles,
      textFormat: node.textFormat
    });
  }

  return node.children.map((child: any, i: number) => {
    if (typeof child === 'string') return child;
    
    // Debug child formatting
    if (process.env.NODE_ENV !== 'production' && child.text) {
      console.log(`Text "${child.text}" formats:`, {
        format: child.format, 
        styles: child.styles,
        textFormat: child.textFormat,
        bold: child.bold,
        italic: child.italic,
        underline: child.underline,
        hasUnderline: !!child.underline,
        hasFormat: !!child.format
      });
    }

    // For complex nodes with children, recursively render their content
    if (child.children && child.children.length > 0) {
      const childContent = renderTextContent(child);
      
      // Apply formatting to this wrapped content
      let content = childContent;
      
      // Apply formatting using all possible property names
      if (child.format === 'bold' || child.bold || child.styles?.includes('bold')) {
        content = <strong key={`bold-${i}`}>{content}</strong>;
      }
      if (child.format === 'italic' || child.italic || child.styles?.includes('italic')) {
        content = <em key={`italic-${i}`}>{content}</em>;
      }
      if (child.format === 'underline' || child.underline || child.textFormat === 'underline' || 
          child.styles?.includes('underline') || child.style?.includes('underline')) {
        content = <u key={`underline-${i}`}>{content}</u>;
      }
      if (child.format === 'strikethrough' || child.strikethrough || child.styles?.includes('strikethrough')) {
        content = <s key={`strike-${i}`}>{content}</s>;
      }
      
      return content;
    }
    
    // For leaf nodes with text
    let content = child.text || '';
    
    // Check if this is already a React element (to avoid re-wrapping)
    if (React.isValidElement(content)) return content;
    
    // Apply text formatting in the correct sequence with all possible property names
    if (child.format === 'bold' || child.bold || child.styles?.includes('bold')) {
      content = <strong key={`bold-${i}`}>{content}</strong>;
    }
    if (child.format === 'italic' || child.italic || child.styles?.includes('italic')) {
      content = <em key={`italic-${i}`}>{content}</em>;
    }
    if (child.format === 'underline' || child.underline || child.textFormat === 'underline' || 
        child.styles?.includes('underline') || child.style?.includes('underline')) {
      content = <u key={`underline-${i}`}>{content}</u>;
    }
    if (child.format === 'strikethrough' || child.strikethrough || child.styles?.includes('strikethrough')) {
      content = <s key={`strike-${i}`}>{content}</s>;
    }
    if (child.format === 'code' || child.code || child.styles?.includes('code')) {
      content = <code key={`code-${i}`} className="bg-gray-100 px-1 rounded">{content}</code>;
    }
    
    // Handle links
    if (child.type === 'link' && child.url) {
      return (
        <a 
          key={`link-${i}`} 
          href={child.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {renderTextContent(child)}
        </a>
      );
    }
    
    return content;
  });
};

export default LexicalRenderer; 