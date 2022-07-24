import { GlobalConfig } from 'payload/types';
import { MenuDescription } from '../blocks/MenuDescription';
import { MenuFeature } from '../blocks/MenuFeature';
import { MenuLink } from '../blocks/MenuLink';
import { MenuTitle } from '../blocks/MenuTitle';

const settingsColumnBlocks = [
  MenuTitle,
  MenuLink,
  MenuDescription,
  // MenuFeature,
];

const Settings: GlobalConfig = {
  slug: 'settings',
  // access: {
  //   read: () => true,
  // },
  fields: [
    {
      name: 'pageMeta', // required
      type: 'group', // required
      fields: [ // required
        {
          name: 'title',
          type: 'text',
          required: true,
          minLength: 20,
          maxLength: 100,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          minLength: 40,
          maxLength: 160,
        }
      ],
    },
    {
      type: 'row', // required
      fields: [ // required
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    }
  ],
};

export default Settings;
