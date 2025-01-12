#!/usr/bin/env node

import { execSync } from 'child_process';

// Get version bump type from args (patch, minor, or major)
const versionType = process.argv[2] || 'patch';

try {
  // Bump version in package.json
  execSync(`npm version ${versionType} --no-git-tag-version`);
  
  // Get the new version
  const { version } = JSON.parse(execSync('npm pkg get version').toString());
  
  // Create git tag
  execSync(`git add package.json`);
  execSync(`git commit -m "Release v${version}"`);
  execSync(`git tag v${version}`);
  
  console.log(`Tagged release v${version}`);
  console.log('Push changes and tag with:');
  console.log(`  git push && git push origin v${version}`);
  console.log('Then create a release on GitHub to trigger publication');
  
} catch (error) {
  console.error('Error creating release:', error);
  process.exit(1);
}