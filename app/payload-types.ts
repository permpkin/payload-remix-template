/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "mainMenu".
 */
export interface MainMenu {
  id: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  _status?: 'draft' | 'published';
  title: string;
  layout?: {
    columns?: {
      width: 'oneThird' | 'half' | 'twoThirds' | 'full';
      alignment: 'left' | 'center' | 'right';
      richText?: {
        [k: string]: unknown;
      }[];
      id?: string;
    }[];
    id?: string;
    blockName?: string;
    blockType: 'content';
  }[];
  description?: string;
  keywords?: string;
  breadcrumbs?: {
    doc?: string | Page;
    url?: string;
    label?: string;
    id?: string;
  }[];
  slug?: string;
  parent?: string | Page;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  enableAPIKey?: boolean;
  apiKey?: string;
  apiKeyIndex?: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
