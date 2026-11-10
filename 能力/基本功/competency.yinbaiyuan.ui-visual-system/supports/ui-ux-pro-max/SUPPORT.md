# 模式与配色定向检索 · 可选支持

## 用途与触发

缺少一个具体交互/表格/配色/字体/图表参考时采用；不是每次设计必经入口。

## 输入输出

一个明确问题和产品/平台/技术栈约束 → 本地检索结果、采纳/拒绝原因以及相应设计决定。

## 调用与方法

先选择最小模式，示例：python3 <本支持目录>/upstream/scripts/search.py "responsive table mobile" --domain ux --json --max-results 3。查询2–5词，核对首条与平台；不相关时改写一次，仍不相关即不用。仅新产品整体方向确有需要才用 --design-system；不默认 --persist，不另造 master/page 主件。

## 依赖

Python 3，标准库；upstream/scripts/search.py 相对其自身读取 data/ 和 references/。无需 npm、API key、全局安装。

## 限制与本次证据

IoT --design-system 本次误给营销页结构、玻璃效果与不适合中文的字体，均被拒绝。推荐仅按目标检索；44px、零横向滚动、风格预设等通用建议不等于 WCAG。结果数量不代表相关性。

## 不可用时

Python/数据不可读或未命中时说明缺口，回到基本功和标准；不自动安装运行时、不把未知推荐存成产品事实。

## 来源与维护

原始包保存在 upstream/，不改写原件；本文件是包外适配。来源、精确快照/本机版本、文件哈希见 SOURCE.json。升级先检查差异与依赖，再重跑受影响场景，不自动追踪main。本支持没有 KSF 对象 ID，不写入 references，也不创建全局/根 .agents/skills 入口；由基本功根据实际缺口按需读取。
