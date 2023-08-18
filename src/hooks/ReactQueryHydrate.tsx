'use client';
import { Hydrate, HydrateProps } from '@tanstack/react-query';

const ReactQueryHydrate = (props: HydrateProps) => {
   return <Hydrate {...props} />;
};

export default ReactQueryHydrate;
