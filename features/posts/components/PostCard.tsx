import { Anchor, Card, Group, Stack, Text, Title } from '@mantine/core';
import { IconHeart, IconMessageCircle2 } from '@tabler/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props {
  post: any;
}

export default function PostCard({ post }: Props) {
  const url = post.url ? new URL(post.url) : null;
  return (
    <Card>
      <Stack spacing="xs">
        <div>
          <Text color="dimmed" size="sm">
            {dayjs.unix(post.time).fromNow()}
          </Text>
          <Title order={4}>{post.title}</Title>
          {url && (
            <Anchor href={post.url} target="_blank">
              {url.hostname}
            </Anchor>
          )}
        </div>
        <Group>
          <Group spacing={4}>
            <IconHeart size={20} /> <Text size="sm">{post.score}</Text>
          </Group>
          <Group spacing={4}>
            <IconMessageCircle2 size={20} /> <Text size="sm">{post.descendants}</Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}
