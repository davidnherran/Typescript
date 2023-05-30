import React, { FC, Fragment } from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: FC = () => {
  return (
    <Fragment>
      <div style={{marginRight: '24px'}}>
      <ContentLoader
        speed={2}
        width={152}
        height={96}
        viewBox="0 0 152 96"
        backgroundColor="#fafafa60"
        foregroundColor="#ecebeb40"
      >
        <rect x="0" y="5" rx="5" ry="5" width="152" height="90" />
      </ContentLoader>
      </div>
      <div style={{marginRight: '24px'}}>
      <ContentLoader
        speed={2}
        width={152}
        height={96}
        viewBox="0 0 152 96"
        backgroundColor="#fafafa60"
        foregroundColor="#ecebeb40"
      >
        <rect x="0" y="5" rx="5" ry="5" width="152" height="90" />
      </ContentLoader>
      </div>
      <div style={{marginRight: '24px'}}>
      <ContentLoader
        speed={2}
        width={152}
        height={96}
        viewBox="0 0 152 96"
        backgroundColor="#fafafa60"
        foregroundColor="#ecebeb40"
      >
        <rect x="0" y="5" rx="5" ry="5" width="152" height="90" />
      </ContentLoader>
      </div>
      <div style={{marginRight: '24px'}}>
      <ContentLoader
        speed={2}
        width={152}
        height={96}
        viewBox="0 0 152 96"
        backgroundColor="#fafafa60"
        foregroundColor="#ecebeb40"
      >
        <rect x="0" y="5" rx="5" ry="5" width="152" height="90" />
      </ContentLoader>
      </div>
      <div style={{marginRight: '24px'}}>
      <ContentLoader
        speed={2}
        width={152}
        height={96}
        viewBox="0 0 152 96"
        backgroundColor="#fafafa60"
        foregroundColor="#ecebeb40"
      >
        <rect x="0" y="5" rx="5" ry="5" width="152" height="90" />
      </ContentLoader>
      </div>
    </Fragment>
  );
};
