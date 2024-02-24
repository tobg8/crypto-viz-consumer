import { Table, TableCell, TableRow, styled } from '@mui/material';

export const TableWrapper = styled(Table)({
  minWidth: 650,
});

export const ListingCurrenciesTableCell = styled(TableCell)({
  fontSize: '.8rem',
  fontWeight: 500,
});

export const ListingCurrenciesTableRow = styled(TableRow)({
  '&:last-child td, &:last-child th': { border: 0 },
  ':hover': {
    backgroundColor: '#eff2f5',
    cursor: 'pointer',
  },
});
