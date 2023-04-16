import React from 'react';
import {useDoc} from '@docusaurus/theme-common/internal';
import Content from '@theme-original/DocItem/Content';
import Admonition from '@theme-original/Admonition';

export default function ContentWrapper(props) {
  const { frontMatter } = useDoc();
  return (
    <>
      {frontMatter.draft ? (
      <Admonition type="info" title="This is a draft">
        This note is classified as a draft, an early and rough idea.
      </Admonition>) : (<></>)}
      <Content {...props} />
    </>
  );
}
