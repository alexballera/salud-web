import React from 'react';

export type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};

export type TabContentProps = {
  itemClick: (item: number) => void;
  content: React.ReactNode;
};

export type TabProps = {
  content: TabContentProps[];
};
