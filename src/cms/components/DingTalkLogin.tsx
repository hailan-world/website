import Link from "next/link";

export default function DingTalkLogin() {
  if (
    !process.env.CMS_DINGTALK_APP_KEY ||
    !process.env.CMS_DINGTALK_APP_SECRET ||
    !process.env.CMS_DINGTALK_CORP_ID
  ) {
    return null;
  }

  return (
    <div className="dingtalk-login">
      <div className="dingtalk-login__divider" aria-hidden="true">
        <span>或</span>
      </div>
      <Link
        className="dingtalk-login__button"
        href="/api/cms/dingtalk/authorize"
        prefetch={false}
      >
        使用海蓝钉钉登录
      </Link>
      <p className="dingtalk-login__note">
        “官网运营”角色可直接编辑并发布；管理员账号仍可使用密码应急登录。
      </p>
    </div>
  );
}
