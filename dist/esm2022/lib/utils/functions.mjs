// https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
// Merge a `source` object to a `target` recursively
export function merge(target, source) {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (let key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], merge(target[key], source[key]));
        }
    }
    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25nLXdpemFyZC9saWIvdXRpbHMvZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlFQUFpRTtBQUNqRSxvREFBb0Q7QUFDcEQsTUFBTSxVQUFVLEtBQUssQ0FBQyxNQUFXLEVBQUUsTUFBVztJQUMxQyxtSEFBbUg7SUFDbkgsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO1lBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvRDtLQUNKO0lBRUQsc0NBQXNDO0lBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVwQyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYWh0Y3gvMGNkOTRlNjI2OTFmNTM5MTYwYjMyZWNkYTE4YWYzZDZcclxuLy8gTWVyZ2UgYSBgc291cmNlYCBvYmplY3QgdG8gYSBgdGFyZ2V0YCByZWN1cnNpdmVseVxyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2UodGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KSB7XHJcbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggYHNvdXJjZWAgcHJvcGVydGllcyBhbmQgaWYgYW4gYE9iamVjdGAgc2V0IHByb3BlcnR5IHRvIG1lcmdlIG9mIGB0YXJnZXRgIGFuZCBgc291cmNlYCBwcm9wZXJ0aWVzXHJcbiAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlKSkge1xyXG4gICAgICAgIGlmIChzb3VyY2Vba2V5XSBpbnN0YW5jZW9mIE9iamVjdCAmJiBrZXkgaW4gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc291cmNlW2tleV0sIG1lcmdlKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBKb2luIGB0YXJnZXRgIGFuZCBtb2RpZmllZCBgc291cmNlYFxyXG4gICAgT2JqZWN0LmFzc2lnbih0YXJnZXQgfHwge30sIHNvdXJjZSk7XHJcblxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufSJdfQ==