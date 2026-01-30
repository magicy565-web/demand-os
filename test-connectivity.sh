#!/bin/bash
# Test connectivity to saas.cnsubscribe.xyz

echo "Testing connectivity to saas.cnsubscribe.xyz..."
echo ""

# Test DNS resolution
echo "1. Testing DNS resolution..."
nslookup saas.cnsubscribe.xyz 2>/dev/null || ping -c 1 saas.cnsubscribe.xyz 2>/dev/null

# Test HTTP connectivity
echo ""
echo "2. Testing HTTP/HTTPS connectivity..."
curl -I -L https://saas.cnsubscribe.xyz 2>/dev/null | head -5

# Test if Directus API is accessible
echo ""
echo "3. Testing Directus API endpoint..."
curl -s -I https://saas.cnsubscribe.xyz/api/server/info 2>/dev/null | head -3

echo ""
echo "4. Testing WebSocket endpoint..."
curl -I -N -H "Connection: Upgrade" -H "Upgrade: websocket" https://saas.cnsubscribe.xyz/websocket 2>/dev/null | head -3

echo ""
echo "Test completed!"
