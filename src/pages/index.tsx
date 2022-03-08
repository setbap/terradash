import Home from "lib/pages/home";
export async function getStaticProps() {
    const res = await fetch("https://api.flipsidecrypto.com/api/v2/queries/f94d7ccf-d668-4e3d-b243-c28cd17bfdbd/data/latest");
    const voterInfo = (await res.json())[0];
    return {
        props: {
            voterInfo,
        },
    }
}
export default Home;
