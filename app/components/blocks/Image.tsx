import React from 'react';
// import NextImage from 'next/image';
import { Block } from 'payload/types';
// import { MediaType } from '../../collections/Media';
import RichText from '../../components/RichText';
import classes from './index.module.css';
// import { sizes } from './sizes';

const sizes = [
  480,
  1024,
  1280,
  1920,
  2560,
];

export type Type = {
  blockType: 'image'
  blockName?: string
  // image: MediaType
  caption?: any
  type: 'normal' | 'wide' | 'fullscreen'
}

export const Image: Block = {
  slug: 'image',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'radio',
      defaultValue: 'normal',
      options: [
        {
          label: 'Normal',
          value: 'normal',
        },
        {
          label: 'Fullscreen',
          value: 'fullscreen',
        },
        {
          label: 'Wide',
          value: 'wide',
        },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'richText',
      admin: {
        elements: [
          'link',
        ],
      },
    },
  ],
};

export const Component: React.FC<Type> = (props) => {
  // const { image, type, caption } = props;
  const { type, caption } = props;

  // if (typeof image === 'object') {
  //   let filenameToRender = image.filename;
  //   let { width } = image;
  //   let { height } = image;

  //   if (image.sizes[type]) {
  //     filenameToRender = image.sizes[type];
  //     width = image.sizes[type].width;
  //     height = image.sizes[type].height;
  //   }

  //   const sizesToUse = sizes.map((size: any) => `(max-width: ${size}px) ${size}px`).join(', ');

  //   return (
  //     <div className={`${'classes.wrap'} ${'classes[type]'}`}>
  //       <NextImage
  //         src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filenameToRender}`}
  //         alt={image.alt}
  //         sizes={sizesToUse}
  //         width={width}
  //         height={height}
  //       />
  //       {caption && (
  //         <RichText
  //           className={'classes.caption'}
  //           content={caption}
  //         />
  //       )}
  //     </div>
  //   );
  // }

  return <h1>IMAGE</h1>;
};