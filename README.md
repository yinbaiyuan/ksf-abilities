# KSF 公用能力源

能力商店入口：https://yinbaiyuan.github.io/ksf-abilities/index.json 。请使用KSF Core 0.5.6及以上。

首发12项0.1.1：系统架构师与4项架构基本功、高级交互设计师与6项设计基本功。安装搭档时自动安装精确依赖。个人同ID能力继续优先，安装与更新不会修改个人原件。

作者仓库遵循 `ksf-source.yaml` v2。每个对象和版本独立维护；CI生成 `ksf-store-catalog-v2` 目录与 `ksf-ability-package-v1` 包。仅添加源不会启用整库能力。包以`roots[]`声明所选能力、`objects[]`保存能力及依赖闭包，能力商店可直接导入`.ksfability`，也可用`ksf ability-store pack`将多个能力和精确依赖打成一包。

私人试用、截图、恢复备份与本机修订字段不在发布范围。外部工具仅在许可明确时附带，保留各包许可与来源说明。
