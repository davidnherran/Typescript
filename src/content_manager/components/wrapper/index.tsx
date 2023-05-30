import React, { FC } from "react";
import { WrapperContainer, WrapperPage, Breadcrumb } from "./wrapper.styles";
import Timeline from "../timeline";
import Range from "../range";
import Configure from "../configure";
import { WrapperProps } from "./wrapper.types";

const Wrapper: FC<WrapperProps> = ({
  children,
  contentData,
  ƒcreateSegment,
  isDndDisabled,
}) => {
  return (
    <WrapperContainer>
      <Breadcrumb>
        <Range />
        <Configure />
      </Breadcrumb>
      <WrapperPage>{children}</WrapperPage>
      <Timeline
        ƒcreateSegment={ƒcreateSegment}
        contentData={contentData}
        isDndDisabled={isDndDisabled}
      />
    </WrapperContainer>
  );
};

export default Wrapper;
