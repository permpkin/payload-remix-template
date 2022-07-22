import { FieldHook } from 'payload/types';
import { generateFullTitle } from '../../../admin/utilities/generateFullTitle';

const populateFullTitle: FieldHook = async ({ data, originalDoc }) =>
  generateFullTitle(data?.breadcrumbs || originalDoc?.breadcrumbs);

export default populateFullTitle;
