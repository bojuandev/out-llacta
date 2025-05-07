import { Button } from '@heroui/button';
import Link from 'next/link';


export default function Home() {

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!

      <Link href="/ethnic-group/shuar">
        <Button>Click me</Button>
      </Link>
    </h1>
  );
}
