# Website Shutdown Instructions

This website has an easy shutdown feature that displays a "SALE CLOSED" splash page.

## To Enable Shutdown Mode

Set the environment variable `SHUTDOWN_ENABLED=true` in your deployment environment.

Examples:
- **Local development**: Add `SHUTDOWN_ENABLED=true` to your `.env` file
- **Production**: Set the environment variable in your hosting platform (Shopify Oxygen, Vercel, etc.)

## To Disable Shutdown Mode

Remove the environment variable or set `SHUTDOWN_ENABLED=false`.

## How It Works

When `SHUTDOWN_ENABLED=true`:
- The entire website is replaced with a simple splash page
- The splash page displays: "SALE CLOSED" and "THANKS FOR YOUR SUPPORT."
- All user interactions (clicks, form submissions, keyboard inputs) are disabled
- No other pages or functionality is accessible

When the variable is not set or `false`, the website operates normally.

## Quick Toggle

This allows for instant shutdown without code changes - just update the environment variable and restart your application. 