import { GlobalConfig } from 'payload/types';
import { MenuDescription } from '../blocks/MenuDescription';
import { MenuFeature } from '../blocks/MenuFeature';
import { MenuLink } from '../blocks/MenuLink';
import { MenuTitle } from '../blocks/MenuTitle';
import link from '../fields/link';

const menuColumnBlocks = [
  MenuTitle,
  MenuLink,
  MenuDescription,
  MenuFeature,
];

const MainMenu: GlobalConfig = {
  slug: 'mainMenu',
  // access: {
  //   read: () => true,
  // },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          label: 'Settings',
          type: 'collapsible', // required
          fields: [ // required
            {
              name: 'type',
              type: 'radio',
              defaultValue: 'link',
              admin: {
                layout: 'horizontal',
              },
              options: [
                {
                  label: 'Link',
                  value: 'link',
                },
                {
                  label: 'Sub-menu',
                  value: 'subMenu',
                },
              ]
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                admin: {
                  // @ts-ignore
                  condition: (_, { type }) => type === 'link',
                },
              },
            }),
          ],
        }
        // {
        //   name: 'subMenu',
        //   label: false,
        //   type: 'group',
        //   admin: {
        //     condition: (_, { type } = {}) => type === 'subMenu',
        //   },
        //   fields: [
        //     {
        //       name: 'blocks',
        //       label: 'Menu Blocks',
        //       labels: {
        //         singular: 'Menu Block',
        //         plural: 'Menu Blocks',
        //       },
        //       type: 'blocks',
        //       blocks: menuColumnBlocks,
        //     },
        //   ],
        // },
      ],
    },
  ],
};

export default MainMenu;
