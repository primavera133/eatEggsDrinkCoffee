import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import { Eat } from "./components/Eat";
import { List } from "./components/List";
import { trpc } from "./trpc";

const AppContent = () => {
  return (
    <Flex as="main" align="center" direction="column">
      <Box w="40rem">
        <List />
        <Eat />
      </Box>
    </Flex>
  );
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8080/trpc",
          // // Optional
          // headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <AppContent />
        </ChakraProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
