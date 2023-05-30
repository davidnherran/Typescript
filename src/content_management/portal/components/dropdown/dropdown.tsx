import React, {useState, useCallback, useRef} from 'react'
import styled, { keyframes } from 'styled-components'

type DirectionType = "top" | "right" | "bottom" | "left";

interface ChevronProps {
  direction: DirectionType;
}

const Chevron = styled.div<ChevronProps>`
  border-style: solid;
  border-width: 0.125rem 0.125rem 0 0;
  height: 0.25rem;
  width: 0.25rem;
  transition: all 0.25s ease-in-out;
  transform: ${(p) => p.direction === "top" && "rotate(-45deg)"};
  transform: ${(p) => p.direction === "right" && "rotate(45deg)"};
  transform: ${(p) => p.direction === "bottom" && "rotate(135deg)"};
  transform: ${(p) => p.direction === "left" && "rotate(-135deg)"};
`;

interface AccordionProps {
  title: string;
  children: React.ReactNode
}

const Container = styled.div`
  width: 84%;
  margin-left: 16%;
  color: white;
  overflow: hidden;
  border-bottom: 1px solid white;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  padding: 0 1.25rem;
  & + & {
    margin-top: -0.125rem;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  cursor: pointer;
`;

const ContentWrapper = styled.div<{ maxHeight: number }>`
  max-height: ${(p) => `${p.maxHeight}px`};
  transition: max-height 0.25s ease-in-out;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 0 0 1rem;
  line-height: 1.5;
  p : {
    cursor: pointer;
    color: "#ebebeb"
  }
`;

const Accordion = ({ title, children }: AccordionProps): JSX.Element => {
  const [isExpanded, setExpand] = useState<boolean>();

  const contentRef = useRef<HTMLDivElement>();
  const contentHeight = isExpanded ? contentRef.current.scrollHeight : 0;

  const handleExpandToggle = useCallback(() => {
    setExpand(!isExpanded);
  }, [isExpanded]);

  return (
    <Container>
      <Title onClick={handleExpandToggle}>
        {title}
        <Chevron direction={isExpanded ? "top" : "bottom"} />
      </Title>
      <ContentWrapper maxHeight={contentHeight}>
        <Content ref={contentRef}>
          {children}
        </Content>
      </ContentWrapper>
    </Container>
  );
};

const Dropdown = ({content}): JSX.Element => (
  <>
  {content?.map((item) => item.CATEGORY)
  .filter((value, index, self) => self.indexOf(value) === index)
  .map((category, index) => (
    <Accordion title={category} key={index}>
      {content?.filter((item) => item.CATEGORY === category)
      .map((item, index) => (
        <p key={index}>{item.NAME}</p>
        ))}
    </Accordion>
    ))}
  </>
);

export default Dropdown;
