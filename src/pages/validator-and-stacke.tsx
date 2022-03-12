import ValidatorAndStacke from "lib/pages/validator-and-stacke";
import { getDailyNewUser } from "lib/requests/daily_new_user";
export async function getStaticProps() {
    const [dailyNewUser,] = await Promise.all(
        [getDailyNewUser()]
    );
    return {
        props: {
            dailyNewUser,
        },
    }
}
export default ValidatorAndStacke;
