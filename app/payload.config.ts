import { buildConfig } from 'payload/config';
import path from 'path';

import formBuilder from '@payloadcms/plugin-form-builder';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import seo from '@payloadcms/plugin-seo';

import Users from './schema/Users';
import Categories from './schema/Categories';
import Media from './schema/Media';
import Posts from './schema/Posts';
import Pages from './schema/Pages';
import BeforeLogin from './admin/components/BeforeLogin';
import BeforeDashboard from './admin/components/BeforeDashboard';
import AfterDashboard from './admin/components/AfterDashboard';
import MainMenu from './admin/globals/MainMenu';

export default buildConfig({
  serverURL: process.env.SITE_URL,
  admin: {

    user: Users.slug,

    // override existing payload styles with custom look
    // css: path.resolve(__dirname, './styles/custom.scss'),

    // // custom components added to show demo info
		components: {
			beforeLogin: [
				BeforeLogin,
			],
			beforeDashboard: [
				BeforeDashboard,
			],
      afterDashboard: [
        AfterDashboard,
      ],
		},

  },

  // collections in Payload are synonymous with database tables, models or entities from other frameworks and systems
  collections: [
    // Categories,
		// Media,
    // Posts,
    Pages,
    Users
  ],

  // globals are a single-instance collection, often used for navigation or site settings that live in one place
	globals: [
		MainMenu,
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
    // formBuilder({
		// 	redirectRelationships: ['pages', 'posts'],
		// }),
		// // @ts-ignore
    nestedDocs({
      collections: ['pages'],
      parentFieldSlug: 'parent',
      breadcrumbsFieldSlug: 'breadcrumbs',
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    // seo({
    //   collections: [
    //     'pages',
    //     'posts',
    //   ],
    //   // @ts-ignore
    //   generateURL: ({ doc, locale }) => `/${doc?.slug?.value}`
    // }),
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
