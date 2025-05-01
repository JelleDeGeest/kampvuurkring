declare module 'payload/config' {
  export function buildConfig(config: any): any;
}

declare module '@payloadcms/db-postgres' {
  export function postgresAdapter(options: any): any;
}

declare module '@payloadcms/richtext-lexical' {
  export function lexicalEditor(options: any): any;
} 