---
version: alpha
name: Field Ledger
description: A compact operations console inspired by municipal field notebooks.
colors:
  primary: "#174C3C"
  on-primary: "#FFFFFF"
  surface: "#F7F4EC"
  on-surface: "#20231F"
  error: "#A42A2A"
  on-error: "#FFFFFF"
typography:
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: 600
    lineHeight: 40px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  label-md:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: 600
    lineHeight: 20px
rounded:
  sm: 4px
  md: 8px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
components:
  heading:
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-lg}"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 40px
    padding: "{spacing.md}"
  error-banner:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
---

## Overview

A municipal field ledger translated into software: compact, dependable, and built for repeated operational use. The interface serves dispatchers who scan changing records throughout the day. It should feel like a precise working document, not a marketing dashboard.

## Colors

Warm paper {colors.surface} carries the workspace. Forest ink {colors.primary} marks the single primary action and active navigation. Text uses {colors.on-surface}; destructive failures alone use {colors.error}.

## Typography

IBM Plex Sans carries headings and body copy. IBM Plex Mono is reserved for labels, identifiers, timestamps, and compact controls. Hierarchy comes from weight and spacing rather than oversized type.

## Layout

Use a dense 8px rhythm. Keep filters and actions near the records they affect. Tables and lists take precedence over decorative summary cards.

## Elevation & Depth

Use borders and surface changes for structure. Shadows are reserved for menus, dialogs, and dragged objects.

## Shapes

Corners are restrained: {rounded.sm} for controls and {rounded.md} for bounded tools. Avoid pill-shaped containers except for status indicators.

## Components

Primary buttons use `button-primary`; ordinary panels use `panel`. Loading, empty, error, disabled, hover, focus, and selected states must preserve component dimensions.

## Do's and Don'ts

- Do keep identifiers, timestamps, and numeric columns aligned.
- Do use the primary color for the most important action.
- Don't turn every section into a floating card.
- Don't introduce gradients, glass effects, or decorative illustration.
