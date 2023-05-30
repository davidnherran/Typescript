import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';

// function replaceVars(content, dictionary) {
// 		const content2 = Object.keys(dictionary).reduce((acc, key)=> {
// 			return acc.replaceAll(`{${key}}`, dictionary[key]);
// 		}, content);
// 	return content2;
// }

export function createPdf(div) {
	const input = document.getElementById(div);
	const divHeight = input.clientHeight;
	const divWidth = input.clientWidth;
	const ratio = divHeight / divWidth;
	const pdf = new jsPDF({
		orientation: 'p',
		unit: 'px',
		format: [divWidth, divHeight],
		hotfixes: ["px_scaling"]
	});
  if (pdf) {
		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = ratio * pageWidth;
		domtoimage.toPng(input)
			.then(imgData => {
				pdf.addImage(imgData, 'PNG', 10, 10, pageWidth - 20, pageHeight - 20);
				//pdf.output('dataurlnewwindow');
				pdf.save('download.pdf');
			});
	}
}

export default createPdf;
