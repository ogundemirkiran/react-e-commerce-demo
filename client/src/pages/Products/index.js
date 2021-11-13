import { Box, Grid, Flex, Button } from "@chakra-ui/react";
import React from "react";
import Card from "../../components/Card";
import { useQuery, useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api.js";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroup) => {
      const morePagesExist = lastGroup?.length === 12;

      if (!morePagesExist) {
        return;
      }

      return allGroup.length + 1;
    },
  });

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error " + error.message;

  return (
    <div>
      Products
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {/* {data.map((item, key) => (
          <Card key={key} item={item} />
        ))} */}

        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box w="100%" key={item._id}>
                <Card item={item}></Card>
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Flex mt="10" mb="10" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </div>
  );
}

export default Products;
