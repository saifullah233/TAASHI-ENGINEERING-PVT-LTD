import { socialAccounts, type SocialPlatform } from "../content";
import { httpsUrl } from "../lib/content";
import Icon from "./Icon";

const platformNames: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  x: "X",
};

export default function SocialLinks({ footer = false }: { footer?: boolean }) {
  const accounts = socialAccounts.flatMap(account => {
    const url = httpsUrl(account.url);
    return url ? [{ ...account, url }] : [];
  });
  return <div className={`social-block ${footer ? "social-block--footer" : ""}`}>
    <span className="social-heading">FOLLOW US</span>
    {accounts.length ? <ul className="social-list" aria-label="Company social media accounts">
      {accounts.map(account => <li key={account.platform}>
        <a className="social-link" href={account.url} target="_blank" rel="noopener noreferrer" aria-label={`${account.example ? "Example link to" : "Taashi Engineering on"} ${platformNames[account.platform]} (opens in a new tab)`}>
          <Icon name={account.platform} size={19} /><span>{platformNames[account.platform]}</span>
        </a>
      </li>)}
    </ul> : <>
      <div className="social-list social-list--pending" aria-hidden="true">
        {(["linkedin", "instagram", "facebook"] as SocialPlatform[]).map(platform => <span className="social-link" key={platform}><Icon name={platform} size={19} /><span>{platformNames[platform]}</span></span>)}
      </div>
      <p className="contact-pending">Social account links pending</p>
    </>}
    {accounts.some(account => account.example) && <p className="contact-pending">Example links · Company profiles coming soon</p>}
  </div>;
}
