import React from 'react';

type IProps = {
  title: string;
};

export const AvatarProfile = ({ title }: IProps): JSX.Element => <h2>{title}</h2>;
