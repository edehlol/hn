import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { Center, Container, Pagination, Stack } from '@mantine/core';
import { useState } from 'react';

import { useDidUpdate } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchTopStories } from '../features/posts/api/fetchTopStories';
import { fetchPosts } from '../features/posts/api/fetchPosts';
import PostCard from '../features/posts/components/PostCard';
import { Post } from '../features/posts/types';

interface Props {
  page: number;
}

export default function HomePage({ page }: Props) {
  const [activePage, setPage] = useState(page);
  const router = useRouter();

  const { data } = useQuery(['top'], () => fetchTopStories(), {
    enabled: false,
  });
  const {
    data: posts,
    refetch,
    isFetching,
  } = useQuery(['posts', activePage], () => data && fetchPosts(data, activePage), {
    enabled: false,
  });

  useDidUpdate(() => {
    router.push(`/?page=${activePage}`, undefined, { shallow: true });
    refetch();
  }, [activePage]);

  return (
    <Container>
      <Stack>
        {isFetching ? (
          <>Loading...</>
        ) : (
          posts?.map((post: Post) => <PostCard key={post.id} post={post} />)
        )}
      </Stack>

      {data && (
        <Center>
          <Pagination
            my="xl"
            page={activePage}
            onChange={setPage}
            total={Math.floor(data.length / 10)}
          />
        </Center>
      )}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query?.page) || 1;
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery(['top'], () => fetchTopStories());
  await queryClient.prefetchQuery(['posts', page], () => fetchPosts(data, page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      page,
    },
  };
};
