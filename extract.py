import pypdf
reader = pypdf.PdfReader("Kadir-Akyurek-CV.pdf")
text = "\n".join(page.extract_text() for page in reader.pages)
with open("cv.txt", "w") as f: f.write(text)
