import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSucess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");


const BaseUrl = "https://api.steampowered.com/"
export const api =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (action.type !== apiCallBegan.type) return next(action);

        const { url, method, data, onStart, onSuccess, onError } =
            action.payload;

        if (onStart) dispatch({ type: onStart });

        next(action);

        try {
            const response = await axios.request({
                baseURL: BaseUrl,
                headers: {"Access-Control-Allow-Origin": "*"},
                url,
                method,
                data,
            });
            // General
            dispatch(apiCallSucess(response.data));
            // Specific
            if (onSuccess)
                dispatch({ type: onSuccess, payload: response.data });
        } catch (error) {
            // General
            dispatch(apiCallFailed(error.message));
            // Specific
            if (onError) dispatch({ type: onError, payload: error.message });
        }
    };
const testData = {"appnews":{"appid":1956740,"newsitems":[{"gid":"5124582150145984719","title":"Tournaments in AO20","url":"https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5124582150145984719","is_external_url":true,"author":"pLuS","contents":"Starting in July every Saturday from 10 p.m. we will have official tournaments, they will be announced by our networks, Discord and by console. It will be notified the same day which modality will be used, the prizes, if it is with a drop of items, with registration cost etc... ⛩️ Tournament Formats...","feedlabel":"Community Announcements","date":1688404864,"feedname":"steam_community_announcements","feed_type":1,"appid":1956740},{"gid":"5124582150145932854","title":"Multi-event Fridays at AO20","url":"https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5124582150145932854","is_external_url":true,"author":"pLuS","contents":"On Fridays at 10:00 p.m. (GMT -3) we will do the already classic day of multi-events in AO20, you can follow it on Plus De Ulla's Twitch, to participate must send /GM or /PARTICIPATE as it appears in the console 🩸 Deathmatch The event consists of facing several enemies in a ring where red and blue p...","feedlabel":"Community Announcements","date":1688403635,"feedname":"steam_community_announcements","feed_type":1,"appid":1956740},{"gid":"5124582150136228756","title":"TOURNAMENT \"DORCK CHAMPIONS\"","url":"https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5124582150136228756","is_external_url":true,"author":"pLuS","contents":"TOURNAMENT \"DORCK CHAMPIONS\" Date: Hours: Teams: Inscription: • 300,000 gold coins per team (100,000 gold coins per member) and 1 badge (any color). These requirements must be delivered at the beginning of each first duel. • 8 registered teams (maximum quota) • Any character is invited to participat...","feedlabel":"Community Announcements","date":1688173550,"feedname":"steam_community_announcements","feed_type":1,"appid":1956740},{"gid":"5896948309846923960","title":"Patch Notes 06/16/23","url":"https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5896948309846923960","is_external_url":true,"author":"pLuS","contents":"{STEAM_CLAN_IMAGE}/42257939/979f467e211d139c9f3e570e6d129efaa008abe4.jpg **News:** **•** Added two new shields for members of the “Dark Legion”: the “Legion Fortress Shield” (Def. 10/13) and the “Dark Legion Shield” (Def. 15/17). These shields can be obtained through \"Tiberius ","feedlabel":"Community Announcements","date":1687012725,"feedname":"steam_community_announcements","feed_type":1,"appid":1956740,"tags":["patchnotes"]},{"gid":"5896948309840102581","title":"The LIGA-AO20 came to an end","url":"https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5896948309840102581","is_external_url":true,"author":"pLuS","contents":"Yesterday we finished with the first league in AO20, for 30 days in a row we had more than 150 events where some characters could come to have fun, whether they are registered or not, we had new and quite fun events. We have received complaints and suggestions regarding its organization and they wil...","feedlabel":"Community Announcements","date":1686850764,"feedname":"steam_community_announcements","feed_type":1,"appid":1956740},{"gid":"5140340943316931611","title":"LEAGUE-AO20","url":"https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5140340943316931611","is_external_url":true,"author":"pLuS","contents":"Hello everyone! We hope you are well, we are ending a week with many events for the general public and also for those registered in the LIGA-AO20, we thank you very much for your participation, registration is still open throughout the LIGA, you can sign up by talking to Aranisse or Plus de Ulla to ...","feedlabel":"Community Announcements","date":1684693458,"feedname":"steam_community_announcements","feed_type":1,"appid":1956740},{"gid":"6557848386941272455","title":"The AO20 League is coming!","url":"https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/6557848386941272455","is_external_url":true,"author":"pLuS","contents":"From Monday, May 15 and until Wednesday, June 14, all the events that take place in the game will allow those registered to add points if they manage to be the winners of them, those who achieve the 3 best scores throughout the month will take amazing prizes =) We are waiting for you! More info abou...","feedlabel":"Community Announcements","date":1683811765,"feedname":"steam_community_announcements","feed_type":1,"appid":1956740},{"gid":"5138087875096379972","title":"Patch Notes 09/05/23","url":"https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5138087875096379972","is_external_url":true,"author":"pLuS","contents":"{STEAM_CLAN_IMAGE}/42257939/c95af9404ea04a483778b316ceaccfc4219fcec6.jpg News: -By default, a floating bar is displayed on the left of the screen indicating the life of the group members. It refreshes the moment damage is taken or health is restored. They can optionally hide or show it at will. Chan...","feedlabel":"Community Announcements","date":1683606864,"feedname":"steam_community_announcements","feed_type":1,"appid":1956740,"tags":["patchnotes"]},{"gid":"5138087875095136463","title":"AO20 League","url":"https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5138087875095136463","is_external_url":true,"author":"pLuS","contents":"{STEAM_CLAN_IMAGE}/42257939/490b7489a93165410cd518467c70ef85115002e6.png Hello everyone, as of Tuesday, May 9 the “AO20 League” begins tomorrow, any official event that takes place on the server will give points to Those registered in it, for 30 days, that is, until Saturday June 08 all participants...","feedlabel":"Community Announcements","date":1683577370,"feedname":"steam_community_announcements","feed_type":1,"appid":1956740},{"gid":"5133583099800351089","title":"Balk Tournament 1vs1","url":"https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/5133583099800351089","is_external_url":true,"author":"pLuS","contents":"{STEAM_CLAN_IMAGE}/42257939/efe61f6e596013abdc9d1a44979a1622e5998320.png Balk Tournament 1vs1 🗓️ Date and time: Thursday 27/04, at 10:15 PM (GMT -3). 🏟️ Location: Coordinates 26-53 in the city of Lindos. Level range: 35 to 45. 📃 Pre-registration: Interested players must send me a private message on ...","feedlabel":"Community Announcements","date":1682112604,"feedname":"steam_community_announcements","feed_type":1,"appid":1956740}],"count":37}}
export const SteamAPislice = createSlice({
      name: "steamApi",
      initialState: {
          news: testData,
          loading: false,
      },
  
      reducers: {
          postsRequested: (state, action) => {
            state.loading = true;
          },  
          postsReceived: (state, action) => {
            state.news = action.payload;
            state.loading = false;
          },  
          postsRequestFailed: (state, action) => {
            state.loading = false;
          },
      },
  });

  export default SteamAPislice.reducer;

  const { postsRequested, postsReceived, postsRequestFailed } = SteamAPislice.actions;

  export const selectSteamNews = (state) => state.steamApi.news

  const url = "/ISteamNews/GetNewsForApp/v0002/?appid=1956740&count=10&maxlength=300&format=json";

  export const loadNews = () => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url,
            onStart: postsRequested.type,
            onSuccess: postsReceived.type,
            onError: postsRequestFailed.type,
        })
    );
};
