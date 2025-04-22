import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import './richtext.css'

interface PayloadRichTextProps {
  content: SerializedEditorState;
  className?: string;
}

export const PayloadRichText: React.FC<PayloadRichTextProps> = ({ 
  content,
  className = ''
}) => {
  if (!content) return null;
  
  return (
    <div className={`rich-text-content ${className}`}>
      <RichText data={content} />
    </div>
  );
};

export default PayloadRichText; 