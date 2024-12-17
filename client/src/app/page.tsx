// Dynamically import the client component so it doesn’t trigger server revalidation

export default async function Home() {
  return <>hello</>;
}
