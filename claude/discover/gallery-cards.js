const revisedGalleryCards = [
 ['write', 'Turn it into a file', 'Watch Claude turn anything into something ready to share.', 'card-file.svg'],
 ['plan', 'Make sense of a photo', 'Watch Claude spot details and suggest what to do next.', 'card-photo.svg'],
 ['practice', 'Compare your options.', 'Watch Claude weigh the options side by side.', 'card-compare.svg'],
 ['build', 'Create a website.', 'Watch Claude turn an idea into a website.', 'card-website.svg']
];
for (const [key, title, description, image] of revisedGalleryCards) {
 const card = document.querySelector(`[data-open-cap="${key}"]`);
 card.classList.add("revised-gallery-card");
 card.innerHTML = `<div class="identity-art supplied-card-art" aria-hidden="true"><img src="${image}" alt=""></div><div class="identity-copy"><h3>${title}</h3><p>${description}</p></div>`;
 if (capabilityFlows[key]) capabilityFlows[key].title = title.replace(/\.$/, '');
}
const galleryStyle = document.createElement("style");
galleryStyle.textContent = `
body .capability-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:stretch}
body .identity-card.revised-gallery-card{height:auto;min-height:0;display:flex;flex-direction:column;padding:0 18px 16px;border:1px solid #ffffff16;border-radius:16px;background:linear-gradient(145deg,#252523,#1d1d1b);box-shadow:none;text-align:left;transition:border-color .18s,background .18s}
body .identity-card.revised-gallery-card:hover{border-color:#ffffff35;background:linear-gradient(145deg,#2b2b28,#22221f);transform:none}
body .revised-gallery-card .identity-art.supplied-card-art{position:relative;inset:auto;width:calc(100% + 12px);height:142px;flex:none;margin:0 -6px 8px;padding:0;transform:none;background:none;overflow:hidden}
body .supplied-card-art img{display:block;width:100%;height:100%;object-fit:contain;transform:scale(1.4)}
body .supplied-card-art:before,body .supplied-card-art:after{display:none}
body .revised-gallery-card .identity-copy{position:relative;inset:auto;padding:0;width:100%;margin:0;transform:none;flex:1}
body .revised-gallery-card .identity-copy h3{font-size:21px;line-height:1.16;letter-spacing:-.5px;min-height:49px;margin:0 0 9px;text-wrap:balance}
body .revised-gallery-card .identity-copy p{font-size:12px;line-height:1.5;margin:0;padding:0;color:#b5b1a8}
body .revised-gallery-card .card-arrow{position:static;align-self:flex-end;display:block;margin-top:12px;color:#b7b3aa;font-size:19px;line-height:1}
body .revised-gallery-card[data-open-cap=write] .identity-copy h3,body .revised-gallery-card[data-open-cap=plan] .identity-copy h3{letter-spacing:.15px;line-height:1.22}
@media(max-width:400px){body .identity-card.revised-gallery-card{padding:0 13px 14px}body .revised-gallery-card .identity-art.supplied-card-art{height:124px}body .revised-gallery-card .identity-copy h3{font-size:19px;min-height:45px}}
`;
galleryStyle.textContent += `body .learning-feature{height:180px}body .learning-feature .orbit-ring{top:38px}body .learning-feature .solar-sun{top:49px}body .learning-feature .solar-earth{top:30px}body .gallery-plan-link{margin-top:32px;margin-bottom:16px}`;
galleryStyle.textContent += `body .revised-gallery-card[data-open-cap=plan] .identity-art.supplied-card-art{margin-top:14px;height:128px}@media(max-width:400px){body .revised-gallery-card[data-open-cap=plan] .identity-art.supplied-card-art{height:110px}}`;
document.head.append(galleryStyle);
