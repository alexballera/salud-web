import React from 'react';

export type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};

export type TabContentProps = {
  label: string;
  content: React.ReactNode;
};

export type TabProps = {
  content: TabContentProps[];
};
