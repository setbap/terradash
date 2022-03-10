import Home from "lib/pages/home";
import { getAnchorDeposite } from "lib/requests/anchor_deposite";
import { getDailyNewUser } from "lib/requests/daily_new_user";
import { getSumAnchorDeposite } from "lib/requests/sum_anchor_deposite";
import { getVoteInfo } from "lib/requests/vote_info";
export async function getStaticProps() {
    const [voterInfo, dailyNewUser, anchorDeposite, sumAnchorDeposite] = await Promise.all(
        [getVoteInfo(), getDailyNewUser(), getAnchorDeposite(), getSumAnchorDeposite()]
    );
    return {
        props: {
            voterInfo,
            dailyNewUser,
            anchorDeposite,
            sumAnchorDeposite
        },
    }
}
export default Home;
