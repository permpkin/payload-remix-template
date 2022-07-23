import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";

import { BlockRenderer } from "~/components/BlockRenderer";
import { Page404 } from "~/components/404";
import type { Page } from "~/payload-types";

type LoaderData = { page: Page };

export const loader: LoaderFunction = async ({ context: { payload }, params }) => {

  // query pages using the matching param.
  const pageQuery = await payload.find({
    collection: 'pages',
  });

  // Throw a 404 if there were no matches.
  if (!pageQuery.docs[0]) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ page: pageQuery.docs[0] });

};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.page.title,
    description: data.page.description,
    keywords: data.page.keywords,
    viewport: 'width=device-width, initial-scale=1',
    'og:title': data.page.title,
    'og:description': data.page.description,
    'og:image': data.page?.image || 'default-image'
  }
}

export default function PageRenderer() {

  const { page } = useLoaderData<LoaderData>();
  
  return (
    <main className="relative" role="document">
      <BlockRenderer layout={page.layout as any}/>
    </main>
  );

}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <Page404/>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}