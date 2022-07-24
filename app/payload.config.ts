import { buildConfig } from 'payload/config';
import path from 'path';

import formBuilder from '@payloadcms/plugin-form-builder';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import seo from '@payloadcms/plugin-seo';

import Users from './schema/Users';
import Categories from './schema/Categories';
import Uploads from './schema/Uploads';
import Posts from './schema/Posts';
import Pages from './schema/Pages';
import BeforeLogin from './admin/components/BeforeLogin';
import BeforeDashboard from './admin/components/BeforeDashboard';
import AfterDashboard from './admin/components/AfterDashboard';
import MainMenu from './admin/globals/MainMenu';
import Test from './admin/components/Test';
import { BrandLogo } from './components/BrandLogo';
import Settings from './admin/globals/Settings';
import config from './env.config'

export default buildConfig({
  serverURL: config.SITE_URL,
  admin: {

    user: Users.slug,

    // override existing payload styles with custom look
    // css: path.resolve(__dirname, './styles/custom.scss'),

    // // custom components added to show demo info
		components: {
      beforeNavLinks: [
        // Test
      ],
      // Nav: Test,
			beforeLogin: [
				BeforeLogin,
			],
			beforeDashboard: [
				BeforeDashboard,
			],
      afterDashboard: [
        AfterDashboard,
      ],
      graphics: {
        Icon: BrandLogo
      }
		},

  },

  // collections in Payload are synonymous with database tables, models or entities from other frameworks and systems
  collections: [
    // Categories,
    // Posts,
    Pages,
		Uploads,
    Users
  ],

  // globals are a single-instance collection, often used for navigation or site settings that live in one place
	globals: [
		MainMenu,
    Settings
	],

  // rateLimits provide basic API DDOS (Denial-of-service) protection and can limit accidental server load from scripts
  rateLimit: {
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
    max: 2400, // limit each IP per windowMs
  },

  // GraphQL is included by default at /api/graphql
  graphQL: {
    disablePlaygroundInProduction: true,
  },

  // if not using graphQL it should be disabled for security and performance reasons
  // graphQL: false

  plugins: [
    formBuilder({
			redirectRelationships: ['pages'],
      // formSubmissionOverrides: {
      //   slug: 'entries'
      // }
		}),
		// @ts-ignore
    nestedDocs({
      collections: [
        'pages'
      ],
      parentFieldSlug: 'parent',
      breadcrumbsFieldSlug: 'breadcrumbs',
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    seo({
      collections: [
        'pages',
        // 'posts',
      ],
      // @ts-ignore
      generateURL: ({ doc: { fields } }) => {
        return `${config.SITE_URL}${fields[`breadcrumbs.${fields.breadcrumbs.value - 1}.url`].value}`
      }
    }),
  ],

	localization: {
		defaultLocale: 'en',
		locales: [
			'en',
			'es',
			'de'
		],
	},

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },

});
