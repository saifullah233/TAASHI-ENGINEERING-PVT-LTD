import { approvedAssets } from "../data/assets";
import Icon from "./Icon";

export default function CompanyProfileDownload() {
  const pdf = approvedAssets.companyProfilePdf;
  return pdf ? (
    <a className="profile-download" href={pdf} download>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true">
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
      </svg>
      Download Company Profile <span className="download-format">PDF</span>
    </a>
  ) : (
    <div className="profile-download-pending">
      <button className="profile-download" type="button" disabled aria-describedby="profile-pdf-pending">
        <Icon name="layers" size={18} /> Download Company Profile
      </button>
      <span id="profile-pdf-pending">Development placeholder · Approved PDF pending</span>
    </div>
  );
}
