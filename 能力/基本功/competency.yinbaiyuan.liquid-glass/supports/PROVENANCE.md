# 原始 Skill 来源与适配边界

用户指定安装入口：https://liquidglass.dev/install-skill.sh 。2026-10-25先读取脚本，再用Codex官方skill-installer固定提交安装到宿主的技能目录，未执行远程管道脚本。脚本原本会替换Codex和Claude的同名目录；本次仅安装当前Codex宿主，不改其他已有Skill。

来源：gentpan/liquidglass，commit 068ad226f53e1ca62d857f78bdc32f58f3c5fce7，MIT。liquid-glass-web/是此提交skill目录的未改副本，共14个文件；逐文件SHA256见source-manifest.json。许可证见LICENSE.txt。此目录是技术原件；KSF基本功负责采用条件、判断、交付及边界，不改变原件。

原始脚本、演示和浏览器方法须按宿主可用工具与授权使用，引用不意味着已运行。上游跨引擎报告不等于当前项目验证。项目实现如需CSP、React或可访问性适配，在工程中维护差异并保留来源，不反向改写本原件。
