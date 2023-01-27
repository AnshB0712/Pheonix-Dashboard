import React, { useState } from 'react';
import {
  Button, Flex,
} from '@mantine/core';
import {
  IconPlus,
} from '@tabler/icons';
import { Link, Outlet } from 'react-router-dom';
import CardsContainer from '../../components/CardsContainer';
import useGetCatalogue from '../../hooks/useGetCatalogue';
import CatalogueCards from './components/CatalogueCards';
import DisplayData from '../../components/DisplayData';
import SearchInput from './components/SearchInput';

function Catalogue() {
  const { data, mutate: catalogueMutate } = useGetCatalogue();
  const [query, setQuery] = useState('');

  // ITEMS THAT ARE RETURNED BY SERVER AND FILTERED BY THE QUERY STATE
  const items = data?.data?.filter((obj) => obj.name.includes(query));

  return (
    <>
      <Flex align="center" justify="space-between" gap={5}>
        <SearchInput setQuery={setQuery} query={query} />
        <Button
          ml="auto"
          size="sm"
          leftIcon={<IconPlus size={18} />}
          component={Link}
          to="/catalogue/forms/null"
        >
          Add Item
        </Button>
      </Flex>
      <CardsContainer>
        <DisplayData data={items} Component={CatalogueCards} componentProps={{ catalogueMutate }} />
      </CardsContainer>
      {/* PLACE TO MODAL TO APPEAR */}
      <Outlet context={[catalogueMutate]} />
    </>
  );
}

export default Catalogue;
