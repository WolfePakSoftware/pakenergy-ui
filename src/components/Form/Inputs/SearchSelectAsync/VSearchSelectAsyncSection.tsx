import React, { FC, useContext } from 'react';
import { EmptyData } from '../../../SelectionList/EmptyData';
import { SearchSelectItems } from '../SearchSelect/SearchSelectItems';
import { VSearchSelectFieldAsyncContext } from './context/VSearchSelectFieldAsyncContext';
import { VSearchSelectSectionBody } from './styled';
import { VSearchSelectFieldAsyncProps } from './VSearchSelectFieldAsync';

export type VSearchSelectAsyncSectionProps = Pick<
  VSearchSelectFieldAsyncProps,
  'multi'
>;

export const VSearchSelectAsyncSection: FC<VSearchSelectAsyncSectionProps> = ({
  multi
}) => {
  const { options, selection, selectDeselectItem } = useContext(
    VSearchSelectFieldAsyncContext
  );

  if (!options.length) {
    return (
      <VSearchSelectSectionBody>
        <EmptyData settings={{}} />
      </VSearchSelectSectionBody>
    );
  }

  return (
    <VSearchSelectSectionBody>
      <SearchSelectItems
        {...{ options, selection, multi, selectDeselectItem }}
        allowNewItem={false}
      />
    </VSearchSelectSectionBody>
  );
};
